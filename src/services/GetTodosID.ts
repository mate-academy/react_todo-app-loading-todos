import { Todo } from '../types/Todo';

export function getTodosId(todosList: Todo[]) {
  return todosList.length + 1;
}
