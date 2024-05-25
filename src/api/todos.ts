import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 651;

export const addTodo = ({ title, userId, completed }: Omit<Todo, 'id'>) => {
  return client.post<Todo>('/todos', { title, userId, completed });
};

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
