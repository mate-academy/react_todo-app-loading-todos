import { Progress } from '../types/Progress';
import { Todo } from '../types/Todo';

export function prepareTodos(todos: Todo[], filterField: Progress) {
  switch (filterField) {
    case Progress.Active:
      return todos.filter(({ completed }) => !completed);
    case Progress.Completed:
      return todos.filter(({ completed }) => completed);
    default:
      return todos;
  }
}
