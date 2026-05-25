import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 4234;

export const getTodos = {
  list: () => client.get<Todo[]>(`/todos?userId=${USER_ID}`),
  // Add more methods here
};
