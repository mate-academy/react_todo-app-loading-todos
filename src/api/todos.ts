import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const getTodo = (todoId: number) => {
  return client.get<Todo[]>(`/todos/${todoId}`);
};

export const postTodos = (userId: number, data: string) => {
  return client.post<Todo>(`/todos?userId=${userId}`, data);
};

export const removeTodo = (userId: number, todoId: number) => {
  return client.delete(`/todos?userId=${userId}/${todoId}`);
};

// Add more methods here
