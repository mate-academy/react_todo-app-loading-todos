import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3023;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const postTodos = (data: Todo) => {
  return client.post<Todo[]>(`/todos?userId=${USER_ID}`, data);
};

// Add more methods here
