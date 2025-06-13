import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3118;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
export const addTodo = (title: string) =>
  client.post<Todo>('/todos', {
    userId: USER_ID,
    title,
    completed: false,
  });

export const deleteTodo = (id: number) => client.delete(`/todos/${id}`);

export const updateTodo = (
  id: number,
  data: Partial<Pick<Todo, 'title' | 'completed'>>,
) => client.patch<Todo>(`/todos/${id}`, data);
