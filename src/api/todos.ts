import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3700;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const createTodo = (title: string): Promise<Todo> => {
  return client.post<Todo>('/todos', {
    userId: USER_ID,
    title,
    completed: false,
  });
};

export const updateTodo = (id: number, data: Partial<Todo>): Promise<Todo> => {
  return client.patch<Todo>(`/todos/${id}`, data);
};

export const deleteTodo = (id: number): Promise<void> => {
  return client.delete<void>(`/todos/${id}`);
};
