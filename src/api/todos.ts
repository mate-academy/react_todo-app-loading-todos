import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number | undefined) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const updateTodoCompleted = (
  todoId: number | undefined, completed: boolean,
) => {
  return client.patch<Todo>(`/todos/${todoId}`, { completed });
};

export const createTodo = (userId: number | undefined, title: string) => {
  return client.post<Todo>('/todos', {
    userId,
    completed: false,
    title,
  });
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};
