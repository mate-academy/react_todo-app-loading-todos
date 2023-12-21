import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

const USER_ID = 12058;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
