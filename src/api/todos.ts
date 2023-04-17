import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = async (userId: number) => {
  const response = await client.get<Todo[]>(`/todos?userId=${userId}`);

  return response;
};

export const postTodos = async (userId: number) => {
  const response = await client.post<Todo[]>(`/todos?userId=${userId}`, { userId });

  return response;
};

export const updateTodos = async (
  userId: number, todoId: number, todo: Todo,
) => {
  const response = await client.patch<Todo[]>(`/todos/${todoId}?userId=${userId}`, todo);

  return response;
};

export const deleteTodos = async (userId: number, todoId: number) => {
  const response = await client.delete(`/todos/${todoId}?userId=${userId}`);

  return response;
};
