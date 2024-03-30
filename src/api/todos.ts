import { Todo } from '../types/Types';
import { client } from '../utils/fetchClient';

export const USER_ID = 398;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
