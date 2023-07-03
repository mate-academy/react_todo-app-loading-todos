import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here

// export const addTodos = (userId: number) => {
//   return client.post<Todo>(`/todos?userId=${userId}`, { userId, title: '123', completed: false });
// };

// export const deleteTodo = (todoId: number) => {
//   return client.delete(`/todos/${todoId}`);
// };
