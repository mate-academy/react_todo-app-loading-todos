import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const postTodos = async (todo: Omit<Todo, 'id'>) => {
  const createdTodo = await client.post<Todo>('/todos', todo);

  return createdTodo;
};

export const patchTodos = async (todo: Partial<Todo>, todoId: number) => {
  const patchedTodo = await client.patch<Todo>(`/todos/${todoId}`, todo);

  return patchedTodo;
};

export const deleteTodo = async (todoId: number) => {
  const deletResult = await client.delete(`/todos/${todoId}`);

  return deletResult;
};
// Add more methods here
