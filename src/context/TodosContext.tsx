import React, { useEffect } from 'react';
import { getTodos } from '../api/todos';
import { Filter, State, Todo } from '../types';
import { wait } from '../utils/fetchClient';

const initialTodos: Todo[] = [];

export const TodosContext = React.createContext<State>({
  todos: initialTodos,
  setTodos: () => {},
  filter: Filter.All,
  setFilter: () => {},
  error: '',
  setError: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = React.useState<Todo[]>(initialTodos);
  const [filter, setFilter] = React.useState<Filter>(Filter.All);
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const value = {
    todos,
    setTodos,
    filter,
    setFilter,
    error,
    setError,
    isLoading,
    setIsLoading,
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);

    wait(3000).then(() => {
      setError('');
    });
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const fetchedTodos = await getTodos();

        setTodos(fetchedTodos);
      } catch {
        handleError('Unable to load todos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
