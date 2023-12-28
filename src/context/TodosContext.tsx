import {
  createContext, FC, ReactNode, useContext, useEffect, useMemo, useState,
} from 'react';
import { ErrorType, FilterType, Todo } from '../types';
import { getTodos } from '../api/todos';
import { useAuthContext } from './AuthContext';

type Props = {
  children: ReactNode;
};

type TodoProviderType = {
  loading: boolean;
  setLoading: (loading:boolean) => void;
  todos: Todo[];
  setTodos: (todos : Todo[]) => void;
  errors: ErrorType | null;
  setErrors: (error : ErrorType | null) => void;
  filter: FilterType;
  setFilter: (filter : FilterType) => void;
  filteredTodos: Todo[];
  inProgress: number;
};

const TodoContext = createContext<TodoProviderType>({
  loading: false,
  setLoading: () => {},
  todos: [],
  setTodos: () => {},
  errors: null,
  setErrors: () => {},
  filter: FilterType.All,
  setFilter: () => {},
  filteredTodos: [],
  inProgress: 0,
});

export const TodosProvider: FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errors, setErrors] = useState<ErrorType | null>(null);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);

  const userId = useAuthContext();

  useEffect(() => {
    if (userId) {
      setErrors(null);
      setLoading(true);
      getTodos(userId)
        .then((data) => {
          setTodos(data);
          setLoading(false);
        })
        .catch(() => {
          setErrors(ErrorType.Load);
          setLoading(false);
        });
    }
  }, [userId]);

  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo => {
        switch (filter) {
          case FilterType.Active:
            return !todo.completed;
          case FilterType.Completed:
            return todo.completed;
          default:
            return true;
        }
      });
  }, [filter, todos]);

  const inProgress = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const value = useMemo(() => ({
    loading,
    setLoading,
    todos,
    setTodos,
    errors,
    setErrors,
    filter,
    setFilter,
    filteredTodos,
    inProgress,
  }), [errors, todos, filteredTodos, filter, loading, inProgress]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
