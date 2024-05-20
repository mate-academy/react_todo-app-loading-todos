import { Todo } from '../types/Todo';
import { USER_ID, getTodos } from '../api/todos';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useErrors } from './useErrors';
import { Errors } from '../types/Errors';

export interface TodosContextValue {
  todos: Todo[];
  isLoading: boolean;
  errors: Errors;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setErrors: Dispatch<SetStateAction<Errors>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  triggerError: (errorKey: keyof Errors) => void;
}

export const useTodos = (): TodosContextValue => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, triggerError, setErrors] = useErrors({
    titleError: false,
    loadingError: false,
    addTodoError: false,
    updateTodoError: false,
    deleteTodoError: false,
  });

  useEffect(() => {
    if (USER_ID) {
      setIsLoading(true);
      getTodos()
        .then(todosData => setTodos(todosData))
        .catch(() => {
          triggerError('loadingError');
        })
        .finally(() => setIsLoading(false));
    }
  }, [triggerError]);

  return {
    todos,
    setTodos,
    isLoading,
    setIsLoading,
    errors,
    triggerError,
    setErrors,
  };
};
