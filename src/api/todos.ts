import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3912;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodos = (title: string) => {
  return client.post<Todo>('/todos', {
    title,
    userId: USER_ID,
    completed: false,
  });
};

export const deleteTodos = async (id: number): Promise<void> => {
  await client.delete(`/todos/${id}`);
};

export const updateTodos = async (id: number, todo: Todo): Promise<Todo> => {
  const response = await client.patch<Todo>(`/todos/${id}`, todo);

  return response;
};
// Add more methods here
