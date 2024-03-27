import React, {
  createContext,
  useContext,
  useState,
  FC,
  useEffect,
} from 'react';
import { Todo } from '../types/Todo';
import { TodosContextType } from '../types/TodosContextType';
import { Filter } from '../types/Filter';
import { getTodos } from '../api/todos';

const initialTodos: Todo[] = [];

const TodosContext = createContext<TodosContextType>({
  todos: initialTodos,
  filter: Filter.ALL,
  addTodo: () => {},
  removeTodo: () => {},
  setTodos: () => {},
  setFilter: () => {},
  query: '',
  setQuery: () => {},
  error: null,
  setError: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');

    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const [query, setQuery] = useState('');
  const [error, setError] = useState<{ message: string } | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const addTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const removeTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const fetchedTodos = await getTodos();

        setTodos(fetchedTodos);
      } catch {
        setError({ message: 'Unable to load todos' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        removeTodo,
        setFilter,
        filter,
        query,
        setQuery,
        error,
        setError,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
