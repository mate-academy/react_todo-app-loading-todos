import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const getAllTodos = async (userId: number) => {
  return getTodos(userId);
};

export const getActiveTodos = async (userId: number) => {
  return (await getTodos(userId)).filter(todo => !todo.completed);
};

export const getCompletedTodos = async (userId: number) => {
  return (await getTodos(userId)).filter(todo => todo.completed);
};
