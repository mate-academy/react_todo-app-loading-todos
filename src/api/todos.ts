// src/api/todos.ts
import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 4423;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};
