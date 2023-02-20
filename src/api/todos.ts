import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

const USER_ID = 6142; // 6357

export const getTodos = (userId: number = USER_ID) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createTodo = (title: string) => {
  return client.post<Todo>('/todos', {
    title,
    completed: false,
    userId: USER_ID,
  });
};

// Add more methods here
