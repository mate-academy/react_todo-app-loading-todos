import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getTodos } from '../api/todos';
import { Errors, Filters, Todo } from '../types';

type TodoContextType = {
  USER_ID: number;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  filterBy: Filters;
  setFilterBy: (filter: Filters) => void;
  errorMessage: Errors | null;
  setErrorMessage: (error: Errors | null) => void;
};

const TodoContext = React.createContext<TodoContextType>({
  USER_ID: 12141,
  todos: [],
  setTodos: () => {},
  filterBy: Filters.All,
  setFilterBy: () => {},
  errorMessage: null,
  setErrorMessage: () => {},
});

export const TodoProvider: React.FC<{ children: ReactNode }> = (
  { children },
) => {
  const USER_ID = 12141;

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<Filters>(Filters.All);
  const [errorMessage, setErrorMessage] = useState<Errors | null>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage(Errors.UnableLoad));
  }, []);

  const value = useMemo(() => ({
    USER_ID,
    todos,
    setTodos,
    errorMessage,
    setErrorMessage,
    filterBy,
    setFilterBy,
  }), [todos, errorMessage, filterBy]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
