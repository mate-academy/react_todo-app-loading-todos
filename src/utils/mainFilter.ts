import { Todo } from '../types/Todo';

export function mainFilter(todo: Todo, position: string) {
  switch (position) {
    case 'Active':
      return !todo.completed;

    case 'Completed':
      return todo.completed;

    default:
      return true;
  }
}
