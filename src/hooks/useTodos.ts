import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api/todos';

export type UseTodos = {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  errorMessage: string;
  setErrorMessage: (error: string) => void;
  tempTodo: Todo | null;
  setTempTodo: (todo: Todo | null) => void;
  loadingIds: number[];
  setLoadingIds: Dispatch<SetStateAction<number[]>>;
};

export const useTodos = (): UseTodos => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => {});
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timeOut = setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return () => {
        clearTimeout(timeOut);
      };
    } else {
      return;
    }
  }, [errorMessage]);

  return {
    todos,
    setTodos,
    errorMessage,
    setErrorMessage,
    tempTodo,
    setTempTodo,
    loadingIds,
    setLoadingIds,
  };
};
