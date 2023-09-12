import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createTodos = ({ id, title, completed }: Omit<Todo, 'userId'>) => {
  return client.post<Todo>('/todos', { id, title, completed });
};

export const updateTodos = ({
  id, userId, title, completed,
}: Todo) => {
  return client.patch<Todo>(`/todos?${id}`,
    {
      id, userId, title, completed,
    });
};

export const deleteTodos = (postId: number) => {
  return client.delete(`/todos/${postId}`);
};
