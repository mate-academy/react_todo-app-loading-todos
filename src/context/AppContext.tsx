import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../types/Todo';
import { SortType } from '../enums/SortType';
import { getTodos } from '../api/todos';

type AppContextContainerProps = {
  error: string | null;
  handleClickCloseError: () => void;
  filterType: SortType;
  changeFilterType: (newType: SortType) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  todos: Todo[] | null;
};

type Props = {
  children: ReactNode;
};

const AppContextContainer = createContext({} as AppContextContainerProps);

export const useAppContextContainer = () => {
  return useContext(AppContextContainer);
};

export const AppContext = ({ children }: Props) => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [filterType, setFilterType] = useState<SortType>(SortType.ALL);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const changeFilterType = (newType: SortType) => setFilterType(newType);

  const handleClickCloseError = () => setError(null);

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .catch(() => setError('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos, error]);

  return (
    <AppContextContainer.Provider
      value={{
        error,
        handleClickCloseError,
        filterType,
        changeFilterType,
        inputRef,
        todos,
      }}
    >
      {children}
    </AppContextContainer.Provider>
  );
};
