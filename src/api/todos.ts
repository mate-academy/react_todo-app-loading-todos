import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here

export const updateTodoStatus = (
  id: number,
  completed: boolean,
): Promise<Todo> => {
  return client.patch<Todo>(`/todos/${id}`, completed);
};
