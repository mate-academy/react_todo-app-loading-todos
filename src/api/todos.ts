import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2619;

export const getTodos = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));

  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const createTodo = (data: Omit<Todo, 'id'>) => {
  return client.post<Todo>('/todos', data);
};

// Add more methods here
