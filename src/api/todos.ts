import { Todo } from '../types/Todo';
import { TodoFromServer } from '../types/TodoFromServer';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addTodos = ({userId, completed, title}: TodoFromServer) => {
  return client.post<Todo>(`/todos`, {userId, completed, title});
};

export const deleteTodos = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodos = (todoId: number, data: Todo) => {
  return client.patch<Todo>(`/todos/${todoId}`, data);
};
