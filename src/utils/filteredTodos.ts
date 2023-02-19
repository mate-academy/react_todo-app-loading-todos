import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  filterType: FilterType,
): Todo[] => {
  const preparedTodos = todos.filter(todo => {
    switch (filterType) {
      case FilterType.All:
        return true;
      case FilterType.Active:
        return !todo.completed;
      case FilterType.Completed:
        return todo.completed;
      default:
        throw new Error('Incorrect filter type');
    }
  });

  return preparedTodos;
};
