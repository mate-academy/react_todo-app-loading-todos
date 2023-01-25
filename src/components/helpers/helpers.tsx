import { FilterType } from '../../types/FilterType';
import { Todo } from '../../types/Todo';

export const getFilterTodos = (todos: Todo[], completedFilter: FilterType) => {
  return todos.filter(todo => {
    switch (completedFilter) {
      case FilterType.Completed:
        return todo.completed;

      case FilterType.Active:
        return !todo.completed;

      default:
        return todo;
    }
  });
};
