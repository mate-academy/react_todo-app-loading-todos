import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3135;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const createTodo = (title: string) => {
  return client.post<Todo>('/todos', {
    userId: USER_ID,
    title,
    completed: false,
  });
};

export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};

export const updateTodo = (
  id: number,
  updates: Partial<Pick<Todo, 'title' | 'completed'>>,
) => {
  return client.patch<Todo>(`/todos/${id}`, updates);
};
