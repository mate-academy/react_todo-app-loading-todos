import { useEffect, useState } from 'react';
import { getTodos } from '../api/todos';
import { TodoType } from '../types/Todo';

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loadingTodos, setLoadingTodos] = useState<boolean>(true);
  const [errorLoadingTodos, setErrorLoadingTodos] = useState<boolean>(false);

  useEffect(() => {
    getTodos(11524)
      .then(setTodos)
      .catch(() => setErrorLoadingTodos(true))
      .finally(() => setLoadingTodos(false));
  }, []);

  return { todos, loadingTodos, errorLoadingTodos };
};
