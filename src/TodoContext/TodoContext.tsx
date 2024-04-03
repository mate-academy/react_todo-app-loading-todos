/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useState } from 'react';
import { ErrorMessages } from '../types/Todo';

type ContextType = {
  error: ErrorMessages | null;
  setError: (value: ErrorMessages | null) => void;
  showError: boolean;
  setShowError: (value: boolean) => void;
  displayError: (message: ErrorMessages) => void;
};

export const TodoContext = React.createContext<ContextType>({
  error: null,
  setError: (_value: ErrorMessages | null) => {},
  showError: false,
  setShowError: (_value: boolean) => {},
  displayError: (_message: ErrorMessages) => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [error, setError] = useState<ErrorMessages | null>(null);
  const [showError, setShowError] = useState(false);

  const displayError = useCallback(
    (message: ErrorMessages) => {
      setError(message);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setError(null);
      }, 3000);
    },
    [setError, setShowError],
  );

  const value = useMemo(
    () => ({
      error,
      setError,
      showError,
      setShowError,
      displayError,
    }),
    [error, showError, displayError],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
