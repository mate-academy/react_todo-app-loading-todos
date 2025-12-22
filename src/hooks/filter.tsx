import { useMemo, useState } from 'react';
import { Todo, Status } from '../types/Todo';

export const useTodosFilter = (todos: Todo[]) => {
  const [statusFilter, setStatusFilter] = useState<Status>(Status.All);

  const filteredTodos = useMemo(() => {
    switch (statusFilter) {
      case Status.Active:
        return todos.filter(todo => !todo.completed);
      case Status.Completed:
        return todos.filter(todo => todo.completed);
      case Status.All:
      default:
        return todos;
    }
  }, [todos, statusFilter]);

  const activeTodosCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const hasCompletedTodos = useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  return {
    statusFilter,
    setStatusFilter,
    filteredTodos,
    activeTodosCount,
    hasCompletedTodos,
  };
};
