import { Todo } from '../types/Todo';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const USER_ID = 2468;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const getUser = () => {
  return client.get<User>(`/users/${USER_ID}`);
};
