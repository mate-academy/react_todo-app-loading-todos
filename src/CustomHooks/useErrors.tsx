import { useState } from 'react';
import { Errors } from '../types/Errors';

export const useErrors = (errors: Errors) => {
  const [loadingErrors, setLoadingTodos] = useState<Errors>({
    errorLoadingTodos: false,
    errorEmptyTitle: false,
    errorUnableToAddTodo: false,
    errorUnableToDeleteTodo: false,
    errorUpdateTodo: false,
  });

  setLoadingTodos(errors);

  return loadingErrors;
};
