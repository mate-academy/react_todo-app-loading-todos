import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 0;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodo = (newTodo: Partial<Todo>) => {
  return client.post<Todo>('/todos', newTodo);
};

export const updateTodo = (todoId: number, updatedFields: Partial<Todo>) => {
  return client.patch(`/todos/${todoId}`, updatedFields);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

// Add more methods here
