import { Todo } from '../types/Todo';
import { USER_ID } from '../utils/UserId';
import { client } from '../utils/fetchClient';

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
