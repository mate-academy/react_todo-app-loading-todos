import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 4175;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const deleteTodos = (id: number) => {
  return client.delete(`/todos/${id}`);
};

export const postTodos = ({ title }: { title: string }): Promise<Todo> => {
  const completed = false;
  const userId = USER_ID;

  return client.post<Todo>(`/todos`, {
    userId,
    title,
    completed,
  });
};

export const patchTodos = (id: number, data: Partial<Todo>) => {
  return client.patch<Todo>(`/todos/${id}`, data);
};
