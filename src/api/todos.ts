import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 4048;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const postTodos = () => {
  return client.post<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const patchTodos = () => {
  return client.patch<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const deleteTodos = () => {
  return client.delete<Todo[]>(`/todos?userId=${USER_ID}`);
};
