import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';
import { USER_ID } from './userId';

export const getTodos = (): Promise<Todo[]> => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};
