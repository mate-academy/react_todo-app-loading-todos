import { Todo } from '../types/Todo';

export const filterByStatus = (todos: Todo[], status: boolean) => {
  return todos.filter(todo => todo.completed === status);
};
