import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const getActiveTodos = (userId: number) => {
  return getTodos(userId)
    .then(todos => todos.filter(todo => !todo.completed));
};

export const getCompletedTodos = (userId: number) => {
  return getTodos(userId)
    .then(todos => todos.filter(todo => todo.completed));
};
