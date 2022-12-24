import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number | undefined) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createTodos = (title: string) => {
  return client.post<Todo[]>('/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: 1,
      userId: 1,
      title,
      completed: false,
    }),
  });
};
// Add more methods here
