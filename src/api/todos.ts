import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number | undefined) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addTodo = (userId: number | undefined, title: string) => {
  return client.post<Todo>('/todos', {
    userId,
    completed: false,
    title,
  });
};

export const updatingTodo = (todoId: number, completed: boolean) => {
  return client.patch(`/todos/${todoId}`, { completed });
};

export const deleteTodoOnServer = (todoId:number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updatingTodoTitle = (todoId: number, title: string) => {
  return client.patch(`/todos/${todoId}`, { title });
};
