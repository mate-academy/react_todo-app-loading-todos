import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

const user = localStorage.getItem('user');

export const USER_ID = user ? JSON.parse(user).id : 4291;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
