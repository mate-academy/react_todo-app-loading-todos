/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

export const useTodos = (userId: number) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorTodos, setErrorTodos] = useState<boolean>(false);

  useEffect(() => {
    getTodos(userId)
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
        setErrorTodos(true);
      });
  }, [userId, todos]);

  return {
    todos, setTodos, errorTodos,
  };
};
