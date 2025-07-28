import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3273;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addNewTodo = ({ userId, title, completed }: Omit<Todo, 'id'>) => {
  return client.post<Todo>(`/todos?userId=${USER_ID}`, {
    userId,
    title,
    completed,
  });
};

export const changeTodoStatus = (id: number, completed: boolean) => {
  return client.patch<Todo>(`/todos?userId=${USER_ID}`, { completed });
};
