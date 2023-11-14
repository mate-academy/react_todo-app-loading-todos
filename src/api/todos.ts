import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here
export const API_URL = 'https://mate.academy/students-api/todos?userId=11593';
export const USER_ID = 11593;
