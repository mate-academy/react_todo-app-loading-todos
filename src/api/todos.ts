import { TodoType } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 515;

export const getTodos = () => {
  return client.get<TodoType[]>(`/todos?userId=${USER_ID}`);
};

export const postTodo = (newTodo: Partial<TodoType>) => {
  return client.post<TodoType>(`/todos`, newTodo);
};

// Add more methods here
