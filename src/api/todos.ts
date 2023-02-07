import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here
export const getTodo = (id: number): Promise<Todo> => {
  return client.get<Todo>(`/todos/${id}`);
};

export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};
