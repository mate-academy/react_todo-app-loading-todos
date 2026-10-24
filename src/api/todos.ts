import { Todo } from '../types/Todo';

const BASE_URL = 'https://mate.academy/students-api';

export const USER_ID = 4548;

const wait = (delay: number) =>
  new Promise(resolve => setTimeout(resolve, delay));

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  await wait(100);

  const response = await fetch(BASE_URL + url, options);

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json() as Promise<T>;
}

export const getTodos = (): Promise<Todo[]> => {
  return request<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodo = (title: string): Promise<Todo> => {
  return request<Todo>('/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ userId: USER_ID, title, completed: false }),
  });
};

export const deleteTodo = (todoId: number): Promise<void> => {
  return request<void>(`/todos/${todoId}`, { method: 'DELETE' });
};

export const updateTodo = (
  todoId: number,
  changes: { title?: string; completed?: boolean },
): Promise<void> => {
  return request<void>(`/todos/${todoId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(changes),
  });
};
