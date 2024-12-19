import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2133;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}?userId=${USER_ID}`);
};

export const addTodo = ({ title, userId, completed }: Omit<Todo, 'id'>) => {
  const data = {
    title,
    userId,
    completed,
  };

  return client.post<Todo>(`/todos?userId=${USER_ID}`, data);
};

export const updateTodo = ({
  id,
  completed,
}: Omit<Todo, 'userId' | 'title'>) => {
  return client.patch<Todo>(`/todos/${id}?userId=${USER_ID}`, { completed });
};
// Add more methods here
