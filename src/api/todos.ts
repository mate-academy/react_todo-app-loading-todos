import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = async (userId: number) => {
  const todos = await client.get<Todo[]>(`/todos?userId=${userId}`);

  return todos;
};

// Add more methods here
