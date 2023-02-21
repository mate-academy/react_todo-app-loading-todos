import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const getCompleted = (userId: number) => {
  return getTodos(userId)
    .then(todos => todos.filter(todo => todo.completed));
};

export const getActive = (userId: number) => {
  // throw new Error();
  return getTodos(userId)
    .then(todos => todos.filter(todo => !todo.completed));
};

// https://mate.academy/students-api/todos?userId=6345
