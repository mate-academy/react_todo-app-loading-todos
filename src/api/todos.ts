import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3044;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodo = ({ title }: Todo) => {
  return client.post<Todo>(`/todos?userId=${USER_ID}`, title);
};

export const deleteTodo = () => {
  return client.delete(`/todos?userId=${USER_ID}`);
};
