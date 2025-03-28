import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2501;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const createTodo = (data: Omit<Todo, 'id'>) => {
  return client.post<Todo[]>(`/todos`, { ...data, userId: USER_ID });
};

export const updateTodos = (todoId: number, data: Partial<Todo>) => {
  return client.patch<Todo[]>(`/todos/${todoId}`, data);
};

export const deleteTodos = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

// Add more methods here
