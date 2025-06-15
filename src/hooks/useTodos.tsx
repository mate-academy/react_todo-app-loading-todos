import { useCallback, useEffect, useState } from 'react';
import { StatusFilterOptions } from '../components/StatusFilter';
import { Todo } from '../types/Todo';
import { getTodos, TodosError } from '../api/todos';

interface GetFilteredTodosFilter {
  status: StatusFilterOptions;
}

function getFilteredTodos(todos: Todo[], filters: GetFilteredTodosFilter) {
  let filteredTodos = [...todos];

  if (filters.status !== StatusFilterOptions.all) {
    filteredTodos = filteredTodos.filter(todo => {
      if (filters.status === StatusFilterOptions.completed) {
        return todo.completed;
      } else {
        return !todo.completed;
      }
    });
  }

  return filteredTodos;
}

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosLoading, setTodosLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState(StatusFilterOptions.all);

  const handleHideError = useCallback(() => setErrorMessage(null), []);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(TodosError.unableToLoad);
      })
      .finally(() => setTodosLoading(false));
  }, []);

  const visibleFooter = todos.length > 0;

  const filteredTodos = getFilteredTodos(todos, { status: statusFilter });

  const completedTodos = todos.filter(todo => todo.completed);

  const activeTodos = todos.length - completedTodos.length;

  return {
    todosLoading,
    errorMessage,
    statusFilter,
    setStatusFilter,
    handleHideError,
    visibleFooter,
    filteredTodos,
    activeTodos,
    completedTodos,
  };
};
