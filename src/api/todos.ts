import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 4063;

export const getTodos = async () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
