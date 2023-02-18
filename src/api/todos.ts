import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here
export const createTodo = (title: string | number) => {
  return client.post<Todo>('/todos', {
    userId: 6336,
    completed: false,
    title,
  });
};

export const updateTodo = (todoId: number, title: string) => {
  return client.patch<Todo>(`/todos/${todoId}`, { title });
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const toogleTodo = (todoId: number, completed: boolean) => {
  return client.patch<Todo>(`/todos/${todoId}`, { completed });
};
