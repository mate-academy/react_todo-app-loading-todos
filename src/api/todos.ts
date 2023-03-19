import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 6689;

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};
