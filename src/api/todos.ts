import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3098;

export const getTodos = () => client.get<Todo[]>(`/todos?userId=${USER_ID}`);

export const addTodo = (todo: Omit<Todo, 'id'>) =>
  client.post<Todo>('/todos', todo);

export const updateTodo = (id: number, updates: Partial<Todo>) =>
  client.patch<Todo>(`/todos/${id}`, updates);

export const deleteTodo = (id: number) => client.delete(`/todos/${id}`);

// Add more methods here
