import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2286;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const deleteTodo = () => {
  return client.delete(`/todos?userId=${USER_ID}`);
};

{
  /*
  export const createTodo = ({ userId, title, completed }: Omit<Todo, 'id'>) => {
  return client.post<Todo>(`/todos?userId=${USER_ID}`, {
    userId,
    title,
    completed,
  });
};
*/
}

// Add more methods here
