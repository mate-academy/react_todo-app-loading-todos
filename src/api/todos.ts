import { client } from '../utils/fetchClient';

import { ITodo } from '../types/Todo.interface';
import { RequireAtLeastOne } from '../types/helpers';

// eslint-disable-next-line max-len
export type PatchTodoData = RequireAtLeastOne<Pick<ITodo, 'title' | 'completed'>, 'title' | 'completed'>;
export type AddTodoData = Pick<ITodo, 'userId' | 'title' | 'completed'>;

export const getTodos = (userId: number) => {
  return client.get<ITodo[]>(`/todos?userId=${userId}`);
};

export const addTodo = (
  data: AddTodoData,
) => {
  return client.post<ITodo>('/todos', data);
};

export const patchTodo = (
  todoId: number,
  data: PatchTodoData,
) => {
  return client.patch<ITodo>(`/todos/${todoId}`, data);
};
