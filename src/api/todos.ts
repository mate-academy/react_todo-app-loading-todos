import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addTodo = (todo: Partial<Todo>): Promise<Todo> => {
  return client.post('/todos', todo);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const patchTodo = (todo: Todo): Promise<Todo> => {
  return client.patch(`/todos/${todo.id}`, todo);
};

// Add more methods here
