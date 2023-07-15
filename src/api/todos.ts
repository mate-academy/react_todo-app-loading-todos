import { client } from '../utils/fetchClient';
import { Todo } from '../types/Todo';

export const getTodos = (userId: number): Promise<Todo[]> => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createTodo = (userId: number, todo: Todo): Promise<Todo> => {
  return client.post<Todo>(`/todos?userId=${userId}`, todo);
};

export const updateTodo = (userId: number,
  todoId: number, updates: Partial<Todo>): Promise<Todo> => {
  return client.patch<Todo>(`/todos/${todoId}?userId=${userId}`, updates);
};

export const deleteTodo = (userId: number, todoId: number): Promise<void> => {
  return client.delete(`/todos/${todoId}?userId=${userId}`) as Promise<void>;
};
