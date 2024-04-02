import { Todo } from '../types/Todo';
import { FilterBy } from '../types/FilterBy';

export function filterTodos(todos: Todo[], filter: FilterBy): Todo[] {
  switch (filter) {
    case FilterBy.Active:
      return todos.filter(todo => !todo.completed);
    case FilterBy.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}
