import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 968;

export const get = async () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};
