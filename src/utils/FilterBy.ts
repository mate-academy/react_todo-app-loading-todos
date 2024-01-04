import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export function getfilterBy(todos: Todo[], filter: Filter) {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    case 'all':
    default:
      return todos;
  }
}
