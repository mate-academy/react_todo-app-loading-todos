import { Todo } from '../types/todo/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3054;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
