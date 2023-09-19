import { Todo } from '../types/Todo';
import { client } from '../utils/httpClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here
