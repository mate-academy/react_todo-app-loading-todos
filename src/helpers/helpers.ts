import { Todo } from '../types/Todo';
import { FilterTypes } from '../types/FilterTypes';

export const filterTodosByCompleted = (
  todosToFilter: Todo[],
  completedFilter: FilterTypes,
) => {
  if (completedFilter === FilterTypes.ALL) {
    return todosToFilter;
  }

  return todosToFilter.filter(todo => {
    switch (completedFilter) {
      case FilterTypes.ACTIVE:
        return !todo.completed;

      case FilterTypes.COMPLETED:
        return todo.completed;

      default:
        return todo;
    }
  });
};
