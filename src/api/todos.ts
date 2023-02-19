import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createTodo = (userId: number, todo: Todo) => {
  return client.post(`/todos?userId=${userId}`, todo);
};

export const updateTodo = (userId: number, todo: Todo) => {
  return client.patch(`/todos?userId=${userId}`, todo);
};

export const deleteTodo = (userId: number) => {
  return client.delete(`/todos?userId=${userId}`);
};
