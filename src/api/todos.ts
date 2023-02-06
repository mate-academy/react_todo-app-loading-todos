import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const saveTodo = (userId: number, data: any) => {
  return client.post<Todo[]>(`/todos?userId=${userId}`, data);
};

export const updateTodo = (userId: number, data: any) => {
  return client.patch<Todo[]>(`/todos?userId=${userId}`, data);
};

export const removeTodos = (userId: number) => {
  return client.delete(`/todos?userId=${userId}`);
};
