import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

const USER_ID = 11468;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};
