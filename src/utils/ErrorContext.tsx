import React, { useState, Dispatch, useEffect } from 'react';
import debounce from 'lodash.debounce';

const initialError = '';

export const ErrorContext = React.createContext(initialError);
export const DispatchContex = React.createContext(
  (() => { }) as Dispatch<string>,
);

  type Props = {
    children: React.ReactNode,
  };

export const ErrorProvider: React.FC<Props> = ({ children }) => {
  const [error, setError] = useState(initialError);

  useEffect(() => debounce(() => setError(''), 3000), [setError, error]);

  return (
    <DispatchContex.Provider value={setError}>
      <ErrorContext.Provider value={error}>
        {children}
      </ErrorContext.Provider>
    </DispatchContex.Provider>
  );
};
