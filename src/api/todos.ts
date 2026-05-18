import { TodoItem } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 4222;

export const getTodos = () => {
  return client.get<TodoItem[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
