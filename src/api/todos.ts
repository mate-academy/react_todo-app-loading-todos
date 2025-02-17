import { Todo } from '../types';
import { client } from '../utils/fetchClient';

export const USER_ID = 907;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
