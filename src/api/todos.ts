import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3289;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here

export const updateTodoStatus = (id: number, completed: boolean) => {
  return client.patch<Todo>(`/todos/${id}`, { completed });
};
