import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const updateTodos = (userId: number, todos: Todo[]) => {
  return client.patch(`/todos?userId=${userId}`, todos);
};
