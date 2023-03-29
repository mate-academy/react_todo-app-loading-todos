import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number, filter?: boolean) => {
  return client.get<Todo[]>(`/todos?userId=${userId}${filter !== undefined
    ? `&completed=${filter}`
    : ''}`);
};
