import { TodoType } from '../types/TodoType';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<TodoType[]>(`/todos?userId=${userId}`);
};

// Add more methods here
