import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 397;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// export function createPost({ title, completed, userId }: Omit<Todo, 'id'>) {
//   return client.<Todo>('/todos', { title, completed, userId });
// }

// Add more methods here
