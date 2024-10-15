import { Todo } from '../types';
import { client } from '../utils';

export const USER_ID = 1589;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};
