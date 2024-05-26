import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 694;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodo = () => {
  return client.post<Todo>(`/todos?userId=${USER_ID}`, {});
};
