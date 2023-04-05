import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addTodos = (url: string, data: any) => {
  return client.post<Todo>(url, data);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const changeTodo = (url: string, data: any) => {
  return client.patch<Todo>(url, data);
};

export const deleteTodos = (url: string) => {
  return client.delete(url);
};
