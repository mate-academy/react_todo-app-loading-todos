import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

export function getFiltredTodoList(filter: Filter, todos: Todo[]) {
  switch (filter) {
    case 'FilterLinkActive':
      return todos.filter(todo => !todo.completed);
    case 'FilterLinkCompleted':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}
