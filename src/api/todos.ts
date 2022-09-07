import { client } from '../utils/fetchClient';

import { Todo } from '../types/Todo';
import { RequireAtLeastOne } from '../types/helpers';

// eslint-disable-next-line max-len
export type PatchTodoData = RequireAtLeastOne<Pick<Todo, 'title' | 'completed'>, 'title' | 'completed'>;

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const patchTodo = (
  todoId: number,
  data: PatchTodoData,
) => {
  return client.patch<Todo>(`/todos/${todoId}`, data);
};
