import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const createTodo = async (
  { userId, title, completed }: Omit<Todo, 'id'>,
) => {
  try {
    const newTodo = await client.post<Todo>(
      '/todos', { userId, title, completed },
    );

    return newTodo;
  } catch (error) {
    throw new Error();
  }
};
