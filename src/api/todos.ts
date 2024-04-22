import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 338;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const postTodo = ({ userId, title, completed }: Omit<Todo, 'id'>) => {
  return client.post<Todo>(`/todos?userId=${USER_ID}`, {
    userId,
    title,
    completed,
  });
};
