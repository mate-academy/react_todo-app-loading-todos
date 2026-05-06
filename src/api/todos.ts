import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

const userFromStorage = localStorage.getItem('user');
const parsedUser = userFromStorage ? JSON.parse(userFromStorage) : null;

export const USER_ID = parsedUser?.id || 0;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
