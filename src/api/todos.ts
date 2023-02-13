import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const getTodo = (id: number): Promise<Todo> => {
  return client.get<Todo>(`/todos/${id}`);
};

export function createTodo(todoData: Omit<Todo, 'id'>): Promise<Todo> {
  return client.post<Todo>('/todos', todoData);
}

export function deleteTodo(todoId: number) {
  return client.delete(`/todos/${todoId}`);
}

export function updateTodo(
  // eslint-disable-next-line object-curly-newline
  { id, title, completed, userId }: Todo,
): Promise<Todo> {
  return client.patch(`/todos/${id}`, { title, completed, userId });
}
