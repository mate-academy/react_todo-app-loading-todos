import { useEffect, useState } from 'react';
import { getTodos, USER_ID } from '../api/todos';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

function getFilteredTodos(todos: Todo[], filter: Filter) {
  switch (filter) {
    case Filter.Active:
      return todos.filter(todo => !todo.completed);
    case Filter.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER_ID]);

  useEffect(() => {
    if (!errorMessage) {
      return undefined;
    }

    const timerId = setTimeout(() => setErrorMessage(''), 3000);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  const visibleTodos = getFilteredTodos(todos, filter);
  const activeCount = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  return {
    todos,
    visibleTodos,
    activeCount,
    hasCompleted,
    filter,
    setFilter,
    errorMessage,
    setErrorMessage,
  };
};
