import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2165;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const createTodo = (body: Todo) => {
  return client.post<Todo>(`/todos?userId=${USER_ID}`, body);
};

export const updateTodo = (id: number | undefined, body: Todo) => {
  return client.patch<Todo>(`/todos/${id}?userId=${USER_ID}`, body);
};

export const deleteTodo = (id: number | undefined) => {
  return client.delete(`/todos/${id}?userId=${USER_ID}`);
};
