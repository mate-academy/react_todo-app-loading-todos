import { Todo } from '../types/Todo';

export const filterSelectedTodos = (type: string, todos: Todo []) => {
  switch (type) {
    case 'Active':
      return todos.filter(({ completed }) => completed === false);
    case 'Completed':
      return todos.filter(({ completed }) => completed === true);
    default:
      return [...todos];
  }
};

export const counterOfUncompleted = (todos: Todo []): number => {
  return todos.filter(({ completed }) => completed === false).length;
};
