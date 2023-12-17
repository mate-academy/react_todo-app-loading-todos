import { Todo } from '../types/Todo';
import { TypeOfFilter } from '../types/TypeOfFilters';

export const filterTodos = (
  todos: Todo[],
  filter: TypeOfFilter,
) => {
  let copy = [...todos];

  if (filter === TypeOfFilter.Active) {
    copy = copy.filter(todo => !todo.completed);
  }

  if (filter === TypeOfFilter.Completed) {
    copy = copy.filter(todo => todo.completed);
  }

  return copy;
};
