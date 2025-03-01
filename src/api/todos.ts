import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2391;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const createTodo = ({
  title,
  completed,
}: Omit<Todo, 'id' | 'userId'>) => {
  return client.post<Todo>('/todos', { userId: USER_ID, title, completed });
};

// Add more methods here
