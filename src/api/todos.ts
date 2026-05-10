import { Todo } from '../types/Todo';
import { NewTodo } from '../types/NewTodo';
import { client } from '../utils/fetchClient';

export const USER_ID = 4138;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const postTodos = (data: NewTodo) => {
  return client.post<Todo>(`/todos`, data);
};

export const deleteTodos = (id: number) => {
  return client.delete(`/todos/${id}`);
};

export const patchTodo = (id: number, data: Partial<Todo>) => {
  return client.patch<Todo>(`/todos/${id}`, data);
};

// Add more methods here
