import type { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

type StoredUser = {
  id?: number;
};

function getStoredUserId(): number {
  const storedUser = localStorage.getItem('user');

  if (!storedUser) {
    return 0;
  }

  try {
    const user = JSON.parse(storedUser) as StoredUser;

    return Number(user.id) || 0;
  } catch {
    return 0;
  }
}

export const USER_ID = getStoredUserId();

export const getTodos = (): Promise<Todo[]> => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};
