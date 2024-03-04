import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 196;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
export const addTodo = () => {
  return client.post<Todo>(`/todos?userId=${USER_ID}`, {
    title: 'Learn JS',
    userId: 212,
    completed: false,
  });
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};
