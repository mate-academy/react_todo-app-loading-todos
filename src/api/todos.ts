import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 9929;

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};
