import { useEffect, useState } from 'react';
import { Todo } from '../types/todo/Todo';
import { StatusFilter } from '../enums/statusFilter';

export const useTodosFilter = (todos: Todo[]) => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    StatusFilter.All,
  );
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    switch (statusFilter) {
      case StatusFilter.Active:
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;
      case StatusFilter.Completed:
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }, [statusFilter, todos]);

  return { statusFilter, setStatusFilter, filteredTodos };
};
