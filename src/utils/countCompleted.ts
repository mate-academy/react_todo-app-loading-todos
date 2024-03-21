import { Todo } from '../types';

export function countCompleted(todos: Todo[]) {
  return todos.reduce((count, todo) => count + Number(todo.completed), 0);
}
