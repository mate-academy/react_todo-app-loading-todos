import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (type: FilterType, todos: Todo[]) => {
  return todos.filter((todo: Todo) => {
    switch (type) {
      case FilterType.Active:
        return !todo.completed;

      case FilterType.Completed:
        return todo.completed;

      default:
        return todo;
    }
  });
};
