import { NewTodo, Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 4369;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here

export const addTodo = (newTodo: NewTodo) => {
  return client.post<Todo>(`/todos?userId=${USER_ID}`, newTodo);
};
