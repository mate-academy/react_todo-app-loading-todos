import { useEffect, useState } from 'react';
import { Todo } from '../types/todo/Todo';
import { getTodos } from '../api/todos';

export const useTodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setIsTodosLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      })
      .finally(() => setIsTodosLoading(false));
  }, []);

  return {
    todos,
    setTodos,
    isTodosLoading,
    setIsTodosLoading,
    loadTodosErrorMessage: errorMessage,
    setLoadTodosErrorMessage: setErrorMessage,
  };
};
