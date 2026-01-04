import { Todo } from '../types/Todo';
import { FILTERS, FilterType } from '../constants/filters';

export const selectFilteredTodos = (
  todos: Todo[],
  filter: FilterType,
): Todo[] => {
  switch (filter) {
    case FILTERS.ACTIVE:
      return todos.filter(todo => !todo.completed);
    case FILTERS.COMPLETED:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export const selectActiveCount = (todos: Todo[]): number =>
  todos.filter(todo => !todo.completed).length;

export const selectHasCompleted = (todos: Todo[]): boolean =>
  todos.some(todo => todo.completed);

export const selectAllCompleted = (todos: Todo[]): boolean =>
  todos.length > 0 && todos.every(todo => todo.completed);
