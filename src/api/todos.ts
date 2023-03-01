import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const getTodosCompleted = (userId: number) => {
  return getTodos(userId).then(todos => todos.filter(todo => todo.completed));
};

export const getTodosActive = (userId: number) => {
  return getTodos(userId).then(todos => todos.filter(todo => !todo.completed));
};
