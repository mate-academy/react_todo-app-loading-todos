import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

// 👇 Используй готовый userId
export const USER_ID = 11349;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};
