import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3918;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
export const createTodo = (data: Omit<Todo, 'id'>) => {
  return client.post<Todo>('/todos', data); // Make sure <Todo> is here
};
