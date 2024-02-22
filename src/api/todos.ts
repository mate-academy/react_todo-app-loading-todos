import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 187;

export const getTodos = (filter = '') => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}${filter}`);
};

// Add more methods here
