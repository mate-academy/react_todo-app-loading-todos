import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2273;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const createTodo = (todo: Todo) => {
  return client.patch<Todo>(`/todos/${todo.id}`, todo);
};
