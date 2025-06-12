import { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api/todos';
import { Errors } from '../types/Errors';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(Errors.loadingUnable))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    todos,
    setTodos,
    errorMessage,
    setErrorMessage,
    isLoading,
    setIsLoading,
  };
};
