import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const fetchTodos = async (userId: string): Promise<Todo[]> => {
  try {
    const arrTodos = await client.get<Todo[]>(`/todos?userId=${userId}`);

    return arrTodos;
  } catch (error) {
    throw new Error(String(error));
  }
};
