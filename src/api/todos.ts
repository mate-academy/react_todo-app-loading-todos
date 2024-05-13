import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 628;

export const getTodosFromApi = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const getCompletedTodosFromApi = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}&completed=true`);
};

export const getTodoFromApi = (id: number) => {
  return client.get<Todo[]>(`/todos?id=${id}`);
};
