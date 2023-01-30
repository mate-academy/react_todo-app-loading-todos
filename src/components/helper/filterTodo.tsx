import { FilterType } from '../../types/FilterType';
import { Todo } from '../../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  completedFilter: FilterType,
) => {
  if (completedFilter === FilterType.All) {
    return todos;
  }

  return todos.filter(todo => (
    FilterType.Completed === completedFilter
      ? todo.completed
      : !todo.completed
  ));
};
