import { Todo } from '../types/typedefs';
import { client } from '../utils/fetchClient';

export const USER_ID = 3090;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const postTodo = (todoData: Omit<Todo, 'id'>) => {
  return client.post<Todo>('/todos', todoData);
};
