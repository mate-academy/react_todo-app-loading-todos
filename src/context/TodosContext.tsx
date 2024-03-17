import React from 'react';
import { Filter, State, Todo } from '../types';

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

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
