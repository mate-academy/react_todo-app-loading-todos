import { useEffect, useMemo, useState } from 'react';
import { getTodos } from '../api/todos';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

const ERROR_TIMEOUT = 3000;

function filterTodos(todos: Todo[], filter: Filter) {
  switch (filter) {
    case Filter.Active:
      return todos.filter(({ completed }) => !completed);
    case Filter.Completed:
      return todos.filter(({ completed }) => completed);
    default:
      return todos;
  }
}

export function useApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return undefined;
    }

    const timerId = setTimeout(() => setErrorMessage(''), ERROR_TIMEOUT);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  const visibleTodos = useMemo(
    () => filterTodos(todos, filter),
    [todos, filter],
  );

  const activeCount = todos.filter(({ completed }) => !completed).length;

  return {
    visibleTodos,
    hasTodos: todos.length > 0,
    activeCount,
    hasCompleted: activeCount < todos.length,
    isAllCompleted: todos.length > 0 && activeCount === 0,
    filter,
    setFilter,
    errorMessage,
    clearError: () => setErrorMessage(''),
  };
}
