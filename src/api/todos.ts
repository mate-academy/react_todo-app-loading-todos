import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 12345;

// ✅ GET
export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// ✅ ADD
export const addTodo = (title: string) => {
  return client.post<Todo>('/todos', {
    title,
    userId: USER_ID,
    completed: false,
  });
};

// ✅ DELETE
export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};

// ✅ UPDATE (toggle / rename depois)
export const updateTodo = (todo: Todo) => {
  return client.patch<Todo>(`/todos/${todo.id}`, todo);
};
