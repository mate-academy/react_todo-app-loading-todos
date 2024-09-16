import { Todo } from '../types/Types';
import { client } from '../utils/fetchClient';

export const USER_ID = 223;

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here
