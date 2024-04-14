import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 474;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const getTodosActive = () => {
  return client
    .get<Todo[]>(`/todos?userId=${USER_ID}`)
    .then(todos => todos.filter(todo => !todo.completed));
};

export const getTodosCompleted = () => {
  return client
    .get<Todo[]>(`/todos?userId=${USER_ID}`)
    .then(todos => todos.filter(todo => todo.completed));
};

// Add more methods here
