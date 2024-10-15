import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 1591;

export const getTodos = (): Promise<Todo[]> => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
