import { Todo } from '../types/Todo';
import { client } from './fetchClient';

export function getTodos(userId: string) {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
}
