import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = import.meta.env.VITE_USER_ID;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodos = ({
  userId = USER_ID,
  title,
  completed = false,
  id,
}: Todo) => {
  return client.post<Todo>(`/todos?userId=${USER_ID}`, {
    userId,
    id,
    title,
    completed,
  });
};

export const updateTodos = ({
  userId = USER_ID,
  title,
  completed,
  id,
}: Todo) => {
  return client.patch<Todo>(`/todos/${id}`, {
    userId,
    id,
    title,
    completed,
  });
};

export const deleteTodos = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};
