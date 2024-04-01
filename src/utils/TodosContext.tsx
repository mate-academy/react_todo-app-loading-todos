import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Error, Filter, Todo, TodoContextType } from '../types';
import { getTodos } from '../api/todos';

const initialValue: Todo[] = [];

const TodosContext = createContext<TodoContextType>({
  todos: initialValue,
  setTodos: () => {},
  addTodo: () => {},
  removeTodo: () => {},
  filter: Filter.All,
  setFilter: () => {},
  query: '',
  setQuery: () => {},
  error: null,
  setError: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

type Props = {
  children: ReactNode;
};

export const TodosProvider: FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [query, setQuery] = useState('');
  const [error, setError] = useState<Error>(null);
  const [isLoading, setIsLoading] = useState(false);

  const addTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const removeTodo = (todoId: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
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
        filter,
        setFilter,
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
