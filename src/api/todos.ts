import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const postTodo = (userId: number, title: string) => {
  const todo = {
    userId,
    title,
    id: Date.now(),
  };

  client.post<Todo>(`/todos?userId=${userId}`, todo);
};
