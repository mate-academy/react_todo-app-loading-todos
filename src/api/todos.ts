import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 1342;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const createNewTodo = ({
  userId,
  title,
  completed,
}: Omit<Todo, 'id'>) => {
  return client.post<Todo[]>('/todos', {
    userId,
    title,
    completed,
  });
};
