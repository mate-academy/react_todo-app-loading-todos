import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3158;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodo = (todo: Omit<Todo, 'id'>) =>
  client.post<Todo>('/todos', todo);

export const updateTodo = (id: number, data: Partial<Todo>) =>
  client.patch<Todo>(`/todos/${id}`, data);

export const deleteTodoById = (id: number) => client.delete(`/todos/${id}`);
