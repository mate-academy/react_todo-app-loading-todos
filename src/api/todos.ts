import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 4228;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const updateTodo = (id: number, data: Partial<Todo>) => {
  return client.patch<Todo>(`/todos/${id}`, data);
};

// Add more methods here
