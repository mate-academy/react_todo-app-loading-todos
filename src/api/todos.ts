import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 597;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const addTodo = ({ title, completed }: Omit<Todo, 'id'>) => {
  return client.post<Todo>('/todos', { title, USER_ID, completed });
};

export const updateTodo = ({ id, ...data }: Todo) => {
  return client.patch<Todo>(`/todos/${id}`, data);
};
