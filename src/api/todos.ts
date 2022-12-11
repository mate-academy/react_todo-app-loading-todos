import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here
export type TodoData = Pick<Todo, 'title' | 'completed' | 'userId'>;

export const createTodo = async ({ title, completed, userId }: TodoData) => {
  return client.post<Todo>('/todo', { title, completed, userId });
};
