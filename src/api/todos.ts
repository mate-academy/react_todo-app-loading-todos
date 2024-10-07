import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 1554;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};
