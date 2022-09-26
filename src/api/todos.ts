import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const updateTodo = (todoId: number, completed: boolean) => {
  return client.patch<Todo>(`/todos/${todoId}`, { completed });
};

// export const toggleAllTodos = (todos: Todo[]) => {
//   return client.patch<Todo>('/todos', { todos });
// };
