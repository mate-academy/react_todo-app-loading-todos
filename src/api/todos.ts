import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2129;

export const getTodos = () => {
  const baseUrl = `/todos?userId=${USER_ID}`;

  return client.get<Todo[]>(baseUrl);
};

// Add more methods here
