import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addTodo = ({ title, userId, completed }: Omit<Todo, 'id'>) => {
  client.post<Todo>('/todos', { title, userId, completed });
};

// Add more methods here
