import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2136;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const deleteTodo = () => {
  return client.delete(`/todos?userId=${USER_ID}`);
};

// export const createTodo = () => {
//   return client.delete(`/todos?userId=${USER_ID}`);
// };

// Add more methods here
