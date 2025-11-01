import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 0;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const createTodo = (title: string) => {
  return client.post<Todo>('/todos', {
    userId: USER_ID,
    title,
    completed: false,
  });
};

export const updateTodo = (todoId: number, data: Partial<Todo>) => {
  return client.patch<Todo>(`/todos/${todoId}`, data);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const toggleAllTodos = (todos: Todo[], completed: boolean) => {
  return Promise.all(
    todos.map(todo => client.patch<Todo>(`/todos/${todo.id}`, { completed })),
  );
};

export const clearCompletedTodos = (todos: Todo[]) => {
  const completed = todos.filter(todo => todo.completed);

  return Promise.all(completed.map(todo => client.delete(`/todos/${todo.id}`)));
};
