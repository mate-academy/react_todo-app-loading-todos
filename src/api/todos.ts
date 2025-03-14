import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2325;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const createTodo = (todo: Omit<Todo, 'id'>) => {
  return client.post<Todo>(`/todos`, todo);
};

export const updateTodo = (todoId: number, todo: Todo) => {
  return client.patch<Todo>(`/todos/${todoId}`, todo);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

// Add more methods here
