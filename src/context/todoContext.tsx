import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { Todo } from '../types/Todo/Todo';
import { getTodos } from '../api/todos';
import { ErrorMessages } from '../types/ErrorMessages/ErrorMessages';
import { Filters } from '../types/Filters/Filters';
import { getFiltedTodos } from '../services/FilterService';

export interface TodoContextType {
  todos: Todo[];
  filteredTodos: Todo[];
  inputRef: React.RefObject<HTMLInputElement>;
  filter: Filters;
  loading: number[] | null;
  editTodoId: number | null;
  setEditTodoId: React.Dispatch<React.SetStateAction<number | null>>;
  errorMessage: ErrorMessages | string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessages | string>>;
  setFilter: React.Dispatch<React.SetStateAction<Filters>>;
  showError: (error: ErrorMessages | string) => void;
  setLoading: React.Dispatch<React.SetStateAction<number[] | null>>;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);

interface ProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<ProviderProps> = ({
  children,
}): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filters.All);
  const [errorMessage, setErrorMessage] = useState<ErrorMessages | string>('');
  const [loading, setLoading] = useState<number[] | null>(null);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const showError = useCallback((error: ErrorMessages | string) => {
    setErrorMessage(error);
    setTimeout(() => setErrorMessage(''), 3000);
  }, []);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
      } catch (error) {
        showError(ErrorMessages.Load);
      }
    };

    loadTodos();
  }, [showError]);

  const filteredTodos = useMemo(
    () => getFiltedTodos(todos, filter),
    [filter, todos],
  );

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        filteredTodos,
        setFilter,
        filter,
        errorMessage,
        setErrorMessage,
        showError,
        setLoading,
        loading,
        editTodoId,
        setEditTodoId,
        inputRef,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
