import { getTodosFromApi } from '../api/todos';
import { Todo } from '../types/Todo';

export function getTodos(): Promise<Todo[]> {
  return getTodosFromApi().then(response => response);
}

export default { getTodos };
