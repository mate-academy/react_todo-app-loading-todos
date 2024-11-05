import { IAddTodo, Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 1826;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const getTodoById = (id: number) => client.get(`/todos/${id}`);

export const getAllCompletedTodoByUserId = (id: number) => {
  client.get(`/todos?userId=${id}&completed=true`);
};

export const addTodo = (todo: IAddTodo) => client.post<Todo>('/todos', todo);

export const updateTodo = (todo: Todo, id: number) =>
  client.patch(`/todos/${id}`, todo);

export const deleteTodo = (id: number) => client.delete(`/todos/${id}`);
