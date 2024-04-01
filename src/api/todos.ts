import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 404;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const deleteTodos = (id: number) => {
  return client.delete(`/todos/${id}`);
};

export const updateTodos = (id: number, data: Todo) => {
  return client.patch<Todo>(`/todos/${id}`, data);
};

// Add more methods here
