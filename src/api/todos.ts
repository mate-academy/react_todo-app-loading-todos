import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 492;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const getTodo = (id: number) => {
  return client.get<Todo[]>(`/todos/${id}`);
};

export const addTodo = ({
  title,
  completed,
  userId = USER_ID,
}: Omit<Todo, 'id'>) => {
  return client.post<Todo[]>(`/todos`, { title, completed, userId });
};

// Add more methods here
