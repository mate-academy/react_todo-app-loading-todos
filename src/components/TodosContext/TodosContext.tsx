/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { Error } from '../../types/ErrorMessages';
import { getTodos } from '../../api/todos';

export const USER_ID = 12016;

type ContextTodos = {
  todos: Todo[];
  setTodos: (newVlue: Todo[]) => void;
  handleSetError: (err: Error) => void;
  isError: Error;
};

export const TodosContext = createContext<ContextTodos>({
  todos: [],
  setTodos: () => {},
  handleSetError: () => {},
  isError: Error.NOT_ERROR,
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(Error.NOT_ERROR);

  const handleSetError = useCallback((error: Error) => {
    setIsError(error);

    if (error) {
      setTimeout(() => {
        setIsError(Error.NOT_ERROR);
      }, 3000);
    }
  }, []);

  const loadTodos = async () => {
    setIsError(Error.NOT_ERROR);

    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      handleSetError(Error.ON_LOAD);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const value = useMemo(() => ({
    todos,
    setTodos,
    isError,
    handleSetError,
  }), [todos, isError, handleSetError]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
