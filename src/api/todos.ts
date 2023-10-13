import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';
import { USER_ID } from './privateID';

export const getTodos = (): Promise<Todo[]> => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
