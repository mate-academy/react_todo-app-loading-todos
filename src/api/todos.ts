import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client
    .get<Todo[]>(`/todos?userqId=${userId}`)
    .catch(() => {
      throw new Error();
    });
};
