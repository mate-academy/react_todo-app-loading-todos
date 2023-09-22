/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

export const useTodos = (userId: number) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos(userId)
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
      });
  }, [userId, todos]);

  return {
    todos, setTodos,
  };
};
