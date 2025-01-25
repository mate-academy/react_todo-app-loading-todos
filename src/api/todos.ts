import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2267;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// export const updateTodos = ({ id, userId, title, completed }: Todo) => {
//   return client.patch<Todo[]>(`/todos/${id}`, { userId, title, completed });
// };

// Add more methods here
