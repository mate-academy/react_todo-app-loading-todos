import {
  createContext, FC, ReactNode, useContext, useEffect, useMemo, useState,
} from 'react';
import { ErrorType, FilterType, Todo } from '../types';

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
  setFilteredTodos: (todos: Todo[]) => void;
  inProgress: number;
  setinProgress: (inProgress : number) => void;
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
  setFilteredTodos: () => {},
  inProgress: 0,
  setinProgress: () => {},
});

export const filterTodos = (data: Todo[], filterType: FilterType) => {
  switch (filterType) {
    case FilterType.Completed:
      return data.filter((todo) => todo.completed);
    case FilterType.Active:
      return data.filter((todo) => !todo.completed);
    default:
      return data;
  }
};

const TodosProvider: FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errors, setErrors] = useState<ErrorType | null>(null);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [inProgress, setinProgress] = useState<number>(0);

  useEffect(() => {
    setFilteredTodos(filterTodos(todos, filter));

    const uncompletedTodos = filterTodos(todos, FilterType.Active);

    setinProgress(uncompletedTodos.length);
  }, [todos, filter]);

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
    setFilteredTodos,
    inProgress,
    setinProgress,
  }), [errors, todos, filteredTodos, filter, loading, inProgress]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodosProvider;

export const useTodos = () => useContext(TodoContext);
