import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

// Registered User ID
export const USER_ID = 4012;

/**
 * Fetches the user's todos from the API
 */
export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
