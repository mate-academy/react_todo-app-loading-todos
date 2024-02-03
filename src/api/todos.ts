import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here
export const removeTodo = (postId: number) => {
  return client.delete(`/todos/${postId}`);
};

export const postTodo = (userId: number, todoBody:Todo) => {
  return client.post(`/todos?userId=${userId}`, todoBody);
};
