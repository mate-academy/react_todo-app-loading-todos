import { TodoType } from '../types/TodoType';
import { client } from '../utils/fetchClient';

export const USER_ID = 6535;

export const getTodos = (userId: number) => {
  return client.get<TodoType[]>(`/todos?userId=${userId}`);
};
