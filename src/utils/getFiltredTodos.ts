import { Todo } from '../types/Todo';
import { FilterStatus } from '../types/FilterStatus';

export const getFiltredTodos = (
  todos: Todo[],
  selectedFilter: FilterStatus,
) => {
  switch (selectedFilter) {
    case FilterStatus.Active:
      return todos.filter(todo => !todo.completed);

    case FilterStatus.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};
