import { Todo } from '../../types/Todo';

export const TodoCounter = (todos: Todo[]): number => {
  return todos.reduce((prev, current) => prev + +!current.completed, 0);
};
