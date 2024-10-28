import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

// https://mate.academy/students-api/todos?userId=1608
export const USER_ID = 1608;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodo = (title: string) => {
  const newTodo = {
    userId: USER_ID,
    title,
    completed: false,
  };

  return client.post<Todo>('/todos', newTodo);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};
