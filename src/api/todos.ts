import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 18;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const postTodo = (title: string) => {
  const newTodo = {
    userId: USER_ID,
    title,
    completed: false,
  };

  return client.post<Todo>('/todos', newTodo);
};

export const deleteTodos = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};
