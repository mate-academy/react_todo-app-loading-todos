import { Todo } from '../types/Todo';

export function isAllCompleted(todos: Todo[]) {
  return todos.every(todo => todo.completed);
}
