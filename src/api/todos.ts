import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 1843;
interface UpdateTodo {
  id: Todo['id'];
  objectData: Partial<Omit<Todo, 'id' | 'userId'>>;
}
export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const createTodos = (obj: Omit<Todo, 'id'>) => {
  return client.post<Todo[]>('/todos', obj);
};

export const updateTodos = ({ id, objectData }: UpdateTodo) => {
  return client.patch<Todo[]>(`/todos/${id}`, {
    ...objectData,
    userId: USER_ID,
  });
};

export const deleteTodos = (id: number) => {
  return client.delete(`/todos/${id}`);
};
// Add more methods here
