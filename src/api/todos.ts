import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

// https://mate.academy/students-api/todos?userId=638

export const USER_ID = 638;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
