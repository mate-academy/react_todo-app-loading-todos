import { client } from '../utils/fetchClient';

export const USER_ID = 4072;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const postCreateTodo = ({
  title,
  completed,
  userId,
}: Omit<Todo, 'id'>) => {
  return client.post<Todo>('/todos', { title, completed, userId });
};

// Add more methods here
