import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 1517;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`).catch(() => {
    throw new Error('Unable to load todos');
  });
};

// Add more methods here
