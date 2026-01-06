import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

// Try to read user id from localStorage. Tests set it there during `cy.visit`.
function readUserId(): number {
  try {
    const raw = localStorage.getItem('user');

    if (!raw) {
      return 0;
    }

    const parsed = JSON.parse(raw);

    return Number(parsed.id) || 0;
  } catch (e) {
    return 0;
  }
}

export const USER_ID = readUserId();

export const getTodos = () => client.get<Todo[]>(`/todos?userId=${USER_ID}`);

export const createTodo = (title: string) =>
  client.post<Todo>('/todos', { userId: USER_ID, title, completed: false });

export const deleteTodo = (id: number) => client.delete(`/todos/${id}`);

export const updateTodo = (id: number, data: Partial<Todo>) =>
  client.patch<Todo>(`/todos/${id}`, data);
