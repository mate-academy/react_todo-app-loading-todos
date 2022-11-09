import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';
import { TodoForServer } from '../types/TodoForServer';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addTodo = (userId: number, todo: TodoForServer) => {
  return client.post<Todo[]>(`/todos?userId=${userId}`, todo);
};

