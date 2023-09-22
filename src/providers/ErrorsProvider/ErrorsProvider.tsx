import {
  PropsWithChildren, createContext, useState,
} from 'react';
import { Errors } from '../../types/Errors';

type AddError = (err: keyof Errors) => void;

type ErrorsContextType = {
  addError: AddError,
  errors: Errors,
};

export const ErrorsContext = createContext<ErrorsContextType>({
  addError: () => {},
  errors: {
    errorLoadingTodos: false,
    errorEmptyTitle: false,
    errorUnableToAddTodo: false,
    errorUnableToDeleteTodo: false,
    errorUpdateTodo: false,
  },
});

export const ErrorsProvider = ({ children }: PropsWithChildren) => {
  const [errors, setErrors] = useState<Errors>({
    errorLoadingTodos: false,
    errorEmptyTitle: false,
    errorUnableToAddTodo: false,
    errorUnableToDeleteTodo: false,
    errorUpdateTodo: false,
  });

  const addError: AddError = (err: keyof Errors) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [err]: true,
    }));
  };

  return (
    <ErrorsContext.Provider value={{ addError, errors }}>
      {children}
    </ErrorsContext.Provider>
  );
};
