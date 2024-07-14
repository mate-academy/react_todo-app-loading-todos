import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 979;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const deleteData = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodoStatus = (id: number, isCompleted: boolean) => {
  return client.patch<Todo>(`/todos/${id}`, { completed: isCompleted });
};

export const addData = async (title: string) => {
  const newTodo = { userId: USER_ID, title, completed: false };

  return client.post<Todo>('/todos', newTodo);
};
