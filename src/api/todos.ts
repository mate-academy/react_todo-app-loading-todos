import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

const DEMO_USER_ID = 4;

const getUserId = () => {
  const savedUser = localStorage.getItem('user');

  if (savedUser) {
    try {
      const parsedUser = JSON.parse(savedUser);

      return Number(parsedUser.id) || DEMO_USER_ID;
    } catch {
      return DEMO_USER_ID;
    }
  }

  return DEMO_USER_ID;
};

export const USER_ID = getUserId();

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
