import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 4453;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// export const postTodos = () => {
//   return client.post<Todo>()
// }
// Add more methods here
