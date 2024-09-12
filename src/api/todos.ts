import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 1233;
export const url = `./todos?userId=${USER_ID}`;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};
