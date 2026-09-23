import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 4501;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodos = (title: string) => {
  return client.post<Todo>(`/todos`, {
    userId: USER_ID,
    title: title,
    completed: false,
  });
};

export const changeTodos = (todo: Todo) => {
  return client.patch<Todo>(`/todos/${todo.id}`, {
    completed: !todo.completed,
  });
};

export const editTodos = (todo: Todo, title: string) => {
  return client.patch<Todo>(`/todos/${todo.id}`, { title });
};

export const deleteTodos = (todo: Todo) => {
  return client.delete(`/todos/${todo.id}`);
};

// Add more methods here
