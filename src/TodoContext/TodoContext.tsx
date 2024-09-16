/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react';
import { ErrorMessages } from '../types/Todo';

type ContextType = {
  error: ErrorMessages | null;
  setError: (value: ErrorMessages | null) => void;
  displayError: (message: ErrorMessages) => void;
};

export const TodoContext = React.createContext<ContextType>({
  error: null,
  setError: (_value: ErrorMessages | null) => {},
  displayError: (_message: ErrorMessages) => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [error, setError] = useState<ErrorMessages | null>(null);

  const displayError = useCallback(
    (message: ErrorMessages) => {
      setError(message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    },
    [setError],
  );

  const value = {
    error,
    setError,
    displayError,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
