import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 4356;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodos = ({ userId, title, completed }: Omit<Todo, 'id'>) => {
  return client.post<Todo[]>(`/todos`, { userId, title, completed });
};

export const deleteTodos = () => {
  return client.delete(`/todos/${USER_ID}`);
};

export const changeTodos = ({ userId, title, completed }: Omit<Todo, 'id'>) => {
  return client.patch<Todo[]>(`/todos/${USER_ID}`, {
    userId,
    title,
    completed,
  });
};
