import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 332;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodos = ({ title }: Pick<Todo, 'title'>) => {
  return client.post<Todo>(`/todos?userId=${USER_ID}`, {
    userId: USER_ID,
    title,
    completed: false,
  });
};

export const editTodos = ({ id, userId, title, completed }: Todo) => {
  return client.patch<Todo>(`/todos/${id}?userId=${USER_ID}`, {
    id,
    userId,
    title,
    completed,
  });
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}?userId=${USER_ID}`);
};

export const deleteTodos = (todoIds: number[]) => {
  return Promise.all(
    todoIds.map(todoId => client.delete(`/todos/${todoId}?userId=${USER_ID}`)),
  );
};
