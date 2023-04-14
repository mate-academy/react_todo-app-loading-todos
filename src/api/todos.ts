import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}&completed=true`);
};

export const creatTodos = (title: string) => {
  return client.post<Todo>('/todos', {
    userId: 6709,
    completed: false,
    title,
  });
};

export const updateTodos = (todoId: number, title: string) => {
  return client.patch<Todo>(`/todos/${todoId}`, { title });
};

export const removeTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};

// Add more methods here
// return client.get<Todo[]>(`/todos?userId=${userId}`);
