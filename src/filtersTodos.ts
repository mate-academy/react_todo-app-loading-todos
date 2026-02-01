import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

export function filterTodos(filterState: Filter, todos: Todo[]): Todo[] {
  if (filterState === Filter.Active) {
    return todos.filter(todo => !todo.completed);
  }

  if (filterState === Filter.Completed) {
    return todos.filter(todo => todo.completed);
  }

  return todos;
}
