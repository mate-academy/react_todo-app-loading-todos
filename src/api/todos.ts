import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

const USER_ID = 11;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const createTodo = (todo: Todo) => {
  return client.post<Todo>('/todos', {
    userId: todo.userId,
    title: todo.title,
    completed: todo.completed,
  });
};

export const updateTodo = (todo: Todo) => {
  return client.patch<Todo>(`/todos/${todo.id}`, {
    userId: todo.userId,
    title: todo.title,
    completed: todo.completed,
  });
};

export const deleteTodos = (id: number) => {
  return client.delete(`todos/${id}`);
};
