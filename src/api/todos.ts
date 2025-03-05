import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2382;

export const getTodos = () => client.get<Todo[]>(`/todos?userId=${USER_ID}`);

export const addTodo = (title: string) =>
  client.post<Todo>('/todos', { userId: USER_ID, title, completed: false });

export const updateTodo = (todoId: number, data: Partial<Todo>) =>
  client.patch<Todo>(`/todos/${todoId}`, data);

export const deleteTodo = (todoId: number) => client.delete(`/todos/${todoId}`);
