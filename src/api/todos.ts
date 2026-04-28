import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 0;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here

export const addTodo = (todo: Omit<Todo, 'id'>) =>
  client.post<Todo>('/todos', todo);

export const deleteTodo = (id: number) => client.delete(`/todos/${id}`);

export const updateTodo = (todo: Todo) =>
  client.patch<Todo>(`/todos/${todo.id}`, todo);
