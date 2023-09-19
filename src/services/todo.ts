import { Todo } from '../types';
import { client } from '../utils/fetchClient';

export function getTodos(userId: number) {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
}
