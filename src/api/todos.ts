import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2093;
const TODOS_URL = `/todos?userId=${USER_ID}`;

export const getTodos = () => client.get<Todo[]>(TODOS_URL);

export const addTodo = (title: string) =>
  client.post<Todo>('/todos', { userId: USER_ID, title, completed: false });

export const deleteTodo = (todoId: number) => client.delete(`/todos/${todoId}`);

export const updateTodo = (todoId: number, data: Partial<Todo>) =>
  client.patch<Todo>(`/todos/${todoId}`, data);
