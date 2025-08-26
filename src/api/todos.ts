import { client } from '../utils/fetchClient';
import { Todo } from '../types/Todo';

export const USER_ID = 3430;

// eslint-disable-next-line @typescript-eslint/no-shadow
export const getTodos = (USER_ID: number) =>
  client.get<Todo[]>(`/todos?userId=${USER_ID}`);

export const createTodo = (title: string) =>
  client.post<Todo>('/todos', {
    title,
    userId: USER_ID,
    completed: false,
  });

export const deleteTodo = (id: number) => client.delete<void>(`/todos/${id}`);

export const updateTodo = (id: number, data: Partial<Todo>) =>
  client.patch<Todo>(`/todos/${id}`, data);
