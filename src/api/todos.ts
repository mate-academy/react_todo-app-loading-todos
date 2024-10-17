import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 1633;

export const getTodos = (): Promise<Todo[]> => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// // Add more methods here
// export const deleteTodos = (userId: number) => {
//   // setTodos(todos.filter(todo => todo.id !== userId));

//   return client.get<Todo[]>(`/todos?userId=${userId}`);
// };
