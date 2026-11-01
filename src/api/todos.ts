import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 4388;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${4388}`);
};

// Add more methods here
