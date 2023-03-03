import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get(`/todos?userId=${userId}`);
};
