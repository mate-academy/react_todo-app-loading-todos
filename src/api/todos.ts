import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3227;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
export const createTodo = (data: Omit<Todo, 'id'>): Promise<Todo> => {
  return client.post('/todos', data);
};

export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};

export const uptadeTodo = (id: number, data: Partial<Todo>): Promise<Todo> => {
  return client.patch(`/todos/${id}`, data);
};
