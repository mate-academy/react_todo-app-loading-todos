import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  filterType: FilterType,
): Todo[] => {
  const preparedTodos = todos.filter(todo => {
    switch (filterType) {
      case FilterType.Active:
        return !todo.completed;
      case FilterType.Completed:
        return todo.completed;
      case FilterType.All:
      default:
        return true;
    }
  });

  return preparedTodos;
};
