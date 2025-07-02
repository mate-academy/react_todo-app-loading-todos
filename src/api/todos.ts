import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3175;
export const URL = `/todos?userId=${USER_ID}`;

export const getTodos = () => {
  return client.get<Todo[]>(URL);
};

// Add more methods here
