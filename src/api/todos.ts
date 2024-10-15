import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';
import { USER_ID } from '../utils/USER_ID';

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const deleteTodos = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};
