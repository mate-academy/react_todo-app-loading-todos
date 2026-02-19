import { client } from '../utils/fetchClient';
import { Todo } from '../types/Todo';

export const USER_ID = 12345;

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};
