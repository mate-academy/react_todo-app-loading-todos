import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here

export const postTodo = (userId: number, data: any) => {
  return client.post(`/todos?userId=${userId}`, data);
};

export const patchTodo = (todoId: number, data: any) => {
  return client.patch(`/todos/${todoId}`, data);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};
