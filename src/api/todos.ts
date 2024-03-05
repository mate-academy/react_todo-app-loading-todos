import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 206;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const postTodos = ({ userId, title, completed }: Omit<Todo, 'id'>) => {
  return client.post<Todo>(`/todos`, { userId, title, completed });
};

// Add more methods here
