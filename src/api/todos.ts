import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 1790;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// export function createPost({ title, body, userId }: Omit<Todo, 'id'>) {
//   return client.post<Todo[]>(`/todos`, { title, body, userId });
// };
