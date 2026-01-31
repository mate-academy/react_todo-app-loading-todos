import { Todo } from '../types/Todo';
import { FilterStatus } from '../types/FilterStatus';

export const getVisibleTodos = (todos: Todo[], filter: FilterStatus) => {
  return todos.filter(todo => {
    switch (filter) {
      case FilterStatus.Active:
        return !todo.completed;
      case FilterStatus.Completed:
        return todo.completed;
      default:
        return true;
    }
  });
};

export const getActiveTodos = (todos: Todo[]) => {
  return todos.filter(todo => !todo.completed);
};
