import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2325;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const postTodos = (data: any) => {
  return client.post<Todo[]>(`/todos`, data);
};

export const updateTodos = (postId: number, data: any) => {
  return client.patch<Todo[]>(`/todos/${postId}`, data);
};

export const deleteTodos = (postId: number) => {
  return client.delete(`/todos/${postId}`);
};

// Add more methods here
