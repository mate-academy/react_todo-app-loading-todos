import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

let USER_ID: number | null = null;

export const setUserId = (id: number) => {
  USER_ID = id;
};

export const getUserId = () => USER_ID;

export const getTodos = () => {
  if (!USER_ID) {
    throw new Error('UserId is not set');
  }

  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export type NewTodo = Omit<Todo, 'id'>;

export const postTodos = (newTodo: NewTodo) => {
  if (!USER_ID) {
    throw new Error('UserId is not set');
  }

  return client.post<Todo>(`/todos`, newTodo);
};

export const deleteTodos = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};
