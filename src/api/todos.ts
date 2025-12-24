import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3802;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const postTodos = (todo: { title: string }) => {
  return client.post<Todo>('/todos', {
    title: todo.title,
    userId: USER_ID,
    completed: false,
  });
};
