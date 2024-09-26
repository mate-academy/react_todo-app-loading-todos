import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 285;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodo = (todo: Todo) => {
  return client.post<Todo[]>(`/todos?userId=${USER_ID}`, todo);
};

export const patchTodo = (todo: Todo) => {
  return client.patch<Todo>(`/todos/${todo.id}?userId=${USER_ID}`, todo);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}?userId=${USER_ID}`);
};
// Add more methods here
