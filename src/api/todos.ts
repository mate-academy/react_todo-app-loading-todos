import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';
import { USER_ID } from '../variables';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const deleteTodo = (todoId: string) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = ({
  id, userId, title, completed,
}: Todo) => {
  return client.patch(`/todos/${USER_ID}`, {
    id, userId, title, completed,
  });
};

export const createTodo = ({ userId, title, completed }: Omit<Todo, 'id'>) => {
  return client.post('/todos', { userId, title, completed });
};
