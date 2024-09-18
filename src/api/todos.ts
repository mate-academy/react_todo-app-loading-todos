import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = '1448';

export const todos = {
  get() {
    return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
  },
};
