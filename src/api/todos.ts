import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 1305;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const updateTodos = (postId: number, completed: boolean) => {
  return client.patch<Todo[]>(`/todos/${postId}`, { completed });
};
// Add more methods here
