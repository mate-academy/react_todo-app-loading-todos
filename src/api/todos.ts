import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2504;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodo = (newTodo: Partial<Todo>) => {
  return client.post<Todo[]>(`/todos`, newTodo);
};

export const updateTodo = (updatedTodo: Partial<Todo>) => {
  return client.patch<Todo[]>(`/todos/${updatedTodo.id}`, updatedTodo);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

// Add more methods here
