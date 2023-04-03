import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`https://mate.academy/students-api/todos?userId=${userId}`);
};

// Add more methods here
