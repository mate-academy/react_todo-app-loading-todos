import { ITodo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<ITodo[]>(`/todos?userId=${userId}`);
};

// Add more methods here
