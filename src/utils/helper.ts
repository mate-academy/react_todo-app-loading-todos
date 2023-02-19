import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';

export function getVisibleTodos(filterType: FilterType, todos: Todo[]): Todo[] {
  return todos.filter(todo => {
    switch (filterType) {
      case FilterType.active:
        return !todo.completed;

      case FilterType.completed:
        return todo.completed;

      default:
        return todo;
    }
  });
}
