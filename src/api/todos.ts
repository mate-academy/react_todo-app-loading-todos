import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${6725}`);
};

export const getFilteredTodos = async (filteringProperty: boolean) => {
  const todos = await getTodos();

  return todos.filter(todo => todo.completed === filteringProperty);
};

export const postTodo = (data: unknown) => {
  return client.post<Todo>(`/todos?userId=${6725}`, data);
};

export const patchTodo = (id: number, data: unknown) => {
  return client.patch<Todo>(`/todos/${id}`, data);
};

export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};
// Add more methods here
