import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 4499;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here

export const addTodo = (post: Todo) => {
  return client.post<Todo>(`/todos`, post);
};

export const updateTodo = (post: Todo, idPost: number) => {
  return client.patch<Todo>(`/todos/${idPost}`, post);
};
