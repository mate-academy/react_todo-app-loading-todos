import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2157;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// export const createTodo = (newTodo: Omit<Todo, 'id'>) => {
//   return client.post<Todo>(`/todos`, newTodo);
// };

// export const deleteTodo = (todoId: number) => {
//   return client.delete(`/todos/${goodId}`);
// };

// export const updateTodo = (todo: Todo) => {
//   const { id, ...todoBody } = todo;

//   return client.patch<Todo>(`/todos/${id}`, todoBody);
// };
