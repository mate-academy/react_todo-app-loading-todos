import { Todo } from '../types/Todo';

export const getUncompletedTodos = (todos: Todo[]) => {
  return todos.filter(({ completed }) => !completed).length;
};
