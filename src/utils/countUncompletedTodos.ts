import { Todo } from '../types';

export const countUncompletedTodos = (
  todoItems: Todo[],
) => todoItems.filter(({ completed }) => completed === false).length;
