import { useEffect } from 'react';
import { callbacks } from '../api/todos';
import { ErrorMessageToShow, Todo } from '../types/Todo';

interface UseTodosProps {
  setTodos: (value: Todo[]) => void;
  setErrorMessage: (value: string) => void;
}

export const useTodos = ({
  setTodos,
  setErrorMessage,
}: UseTodosProps): void => {
  useEffect(() => {
    callbacks
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessageToShow.Load);
      });
  }, []);
};
