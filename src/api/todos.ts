import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const updateTodos = (id: number, data: Todo) => {
  return client.patch<Todo[]>(`/todos/${id}`, data);
};
