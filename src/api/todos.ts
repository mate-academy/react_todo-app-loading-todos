import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = '3000';

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const patchTodos = (data: Todo) => {
  return client.patch<Todo[]>(`/todos?userId=${USER_ID}`, data);
};
