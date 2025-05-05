import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2863;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
export const postTodos = (title: string) => {
  return client.post<Todo>('/todos', {
    title,
    completed: false,
    userId: USER_ID,
  });
};

export const deletePost = (id: number) => {
  return client.delete(`/todos/${id}`);
};

export const updateTodo = (id: number, updatedData: Partial<Todo>) => {
  return client.patch<Todo>(`/todos/${id}`, updatedData);
};
