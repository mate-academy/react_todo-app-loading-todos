import React, {
  Dispatch,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Todo } from '../types/Todo';

export const TodosContext = createContext({
  list: [] as Todo[],
  setList: (() => {}) as Dispatch<React.SetStateAction<Todo[]>>,
});

export const ErrorContext = createContext({
  errorMessage: '',
  setErrorMessage: (() => {}) as Dispatch<React.SetStateAction<string>>,
});

export const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: (() => {}) as Dispatch<React.SetStateAction<boolean>>,
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [list, setList] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const todosState = useMemo(
    () => ({
      list,
      setList,
    }),
    [list],
  );

  const errorState = useMemo(
    () => ({
      errorMessage,
      setErrorMessage,
    }),
    [errorMessage],
  );

  const loadingState = useMemo(
    () => ({
      isLoading,
      setIsLoading,
    }),
    [isLoading],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => setErrorMessage(''), 3000);

    return () => clearTimeout(timeoutId);
  }, [errorMessage]);

  return (
    <LoadingContext.Provider value={loadingState}>
      <ErrorContext.Provider value={errorState}>
        <TodosContext.Provider value={todosState}>
          {children}
        </TodosContext.Provider>
      </ErrorContext.Provider>
    </LoadingContext.Provider>
  );
};
