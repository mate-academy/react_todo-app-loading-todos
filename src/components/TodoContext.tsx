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

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [list, setList] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

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

  useEffect(() => {
    const timeoutId = setTimeout(() => setErrorMessage(''), 3000);

    return () => clearTimeout(timeoutId);
  }, [errorMessage]);

  return (
    <ErrorContext.Provider value={errorState}>
      <TodosContext.Provider value={todosState}>
        {children}
      </TodosContext.Provider>
    </ErrorContext.Provider>
  );
};
