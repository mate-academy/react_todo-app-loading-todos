import { useState, useEffect } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import { getTodos } from '../api/todos';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [title, setTitle] = useState('');

  useEffect(() => {
    setErrorMessage('');

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      case 'all':
      default:
        return true;
    }
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const isEveryCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  return {
    todos,
    visibleTodos,
    errorMessage,
    setErrorMessage,
    filter,
    setFilter,
    title,
    setTitle,
    activeTodosCount,
    isEveryCompleted,
  };
};
