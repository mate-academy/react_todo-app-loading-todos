import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const sendNewTodo = async (title: string, userId: number) => {
  await client.post<Todo>('/todos', {
    title,
    userId,
    completed: false,
  });
};

export const getTodosByStatus = (userId: number, status: boolean) => {
  return client.get<Todo[]>(`/todos?userId=${userId}&completed=${status}`);
};
