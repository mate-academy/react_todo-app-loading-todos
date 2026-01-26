import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3884;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const deleteTodo = () => {
  return client.delete(`/todos?userId=${USER_ID}`);
};

export const editTodo = (data: Todo) => {
  return client.patch<Todo[]>(`/todos?userId=${USER_ID}`, data);
};

export const addTodo = (data: Todo) => {
  return client.post<Todo[]>(`/todos?userId=${USER_ID}`, data);
};

// Add more methods here
