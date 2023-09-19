import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addTodo = (userId: number, data: Todo) => {
  return client.post(`/todos?userId=${userId}`, data);
};

export const updateTodo = (userId: number, data: Todo) => {
  return client.post(`/todos?userId=${userId}`, data);
};

export const deleteTodo = (userId: number, data: Todo) => {
  return client.post(`/todos?userId=${userId}`, data);
};

// Add more methods here
