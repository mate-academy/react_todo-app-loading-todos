import { SendedTodo } from '../types/sendedTodo';
import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const sendTodos = (userId: number, data: SendedTodo) => {
  return client.post<Todo[]>(`/todos?userId=${userId}`, data);
};

export const patchTodos = (
  todoId: number, title?: string, completed?: boolean,
) => {
  return client.patch<Todo[]>(`/todos/${todoId}`, { title, completed });
};

export const deleteTodos = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};
