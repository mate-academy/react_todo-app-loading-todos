import { useEffect, useState } from 'react';
import { Todo } from '../types/todo/Todo';
import { getTodos } from '../api/todos';

export const useTodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return {
    todos,
    setTodos,
    isTodosLoading: isLoading,
    setIsTodosLoading: setIsLoading,
    loadTodosErrorMessage: errorMessage,
    setLoadTodosErrorMessage: setErrorMessage,
  };
};
