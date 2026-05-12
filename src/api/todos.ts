import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

// Read user id from localStorage if available. Tests set localStorage before app load.
function readUserId(): number | null {
  try {
    const raw = localStorage.getItem('user');

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);

    if (parsed && typeof parsed.id === 'number') {
      return parsed.id;
    }

    return null;
  } catch {
    return null;
  }
}

export const USER_ID = readUserId();

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const createTodo = (data: Partial<Todo>) => {
  return client.post<Todo>('/todos', data);
};

export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};

export const updateTodo = (id: number, data: Partial<Todo>) => {
  return client.patch<Todo>(`/todos/${id}`, data);
};
