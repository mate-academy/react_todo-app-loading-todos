import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 4527;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodo = (newTodo: Omit<Todo, 'id'>) => {
  return client.post<Todo>(`/todos?userId=${USER_ID}`, newTodo);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = (updatedTodo: Todo) => {
  return client.patch<Todo>(`/todos/${updatedTodo.id}`, updatedTodo);
};
