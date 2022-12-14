import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createTodo = (
  title: string, userId: number, completed: boolean,
) => {
  return client.post<Todo[]>('/todos', {
    title,
    userId,
    completed,
  });
};

// Add more methods here
