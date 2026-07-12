import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

const getUserId = () => {
  if (typeof window === 'undefined') {
    return 0;
  }

  try {
    const savedUser = window.localStorage.getItem('user');

    if (!savedUser) {
      return 0;
    }

    const parsedUser = JSON.parse(savedUser) as { id?: number };

    return parsedUser.id ?? 0;
  } catch {
    return 0;
  }
};

export const USER_ID = getUserId();

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
