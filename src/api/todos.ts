import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2452;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
// export const addTodo = ({ title }: Omit<Todo, 'id' | 'completed' | 'userId'>) => {
//   return client.post<Todo>(`/todos?userId=${USER_ID}`, {title, userId: USER_ID} );
// }
