import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';
import { USER_ID } from '../api/todos';

export function getTodos() {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
}
