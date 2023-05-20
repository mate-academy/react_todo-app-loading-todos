import { Todo } from '../types/types';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here

export const postTodo = (userId: number, todo: Todo) => {
  return client.post<Todo>(`/todos?userId=${userId}`, todo);
};
