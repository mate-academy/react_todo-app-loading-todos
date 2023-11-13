import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addTodos = ({ userId, title, completed }: Todo) => {
  return client.post<Todo>('/todos', { userId, title, completed });
};

export const updateTodos = ({
  userId, completed, title,
}: Todo) => {
  return client.patch<Todo>(`/todos/${userId}`, { completed, title });
};

export const deleteTodos = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};
