import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 4329;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const patchTodo = (id: number, data: Partial<Omit<Todo, 'id'>>) => {
  return client.patch<Todo>(`/todos/${id}?userId=${USER_ID}`, data);
};

// Add more methods here
