import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3547;

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const createTodo = (title: string) => {
  return client.post<Todo>('/todos', {
    title,
    completed: false,
  });
};

export const updateTodo = (id: number, updates: Partial<Todo>) => {
  return client.patch<Todo>(`/todos/${id}`, updates);
};

export const deleteTodo = (id: number) => {
  return client.delete<void>(`/todos/${id}`);
};
