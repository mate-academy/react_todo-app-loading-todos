import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 568;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const getCompletedTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}&completed=true`);
};

export const getActiveTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}&completed=false`);
};

// Add more methods here
