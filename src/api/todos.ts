import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addTodo = async (todo: Omit<Todo, 'id'>) => {
  const newTodo = await client.post<Todo>('/todos', todo);

  return newTodo;
}
