import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3783; // Replace with your actual USER_ID from registration

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
