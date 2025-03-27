import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2516; //2516;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here

export const getRejectedPromise = () => {
  return Promise.reject(new Error('some test error'));
};
