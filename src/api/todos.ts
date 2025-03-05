import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2392;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};
export const createTodo = (newTodo: Omit<Todo, 'id'>) => {
  return client.post<Todo[]>(`/todos`, newTodo);
};
// export const patchTodos = (todoId: number, updates: Partial<Todo>) => {
//   return client.patch<Todo[]>(`/todos/${todoId}`, updates);
// };
// export const deleteTodo = (todoId: number) => {
//   return client.delete(`/todos${todoId}`);
// };

// Add more methods here
