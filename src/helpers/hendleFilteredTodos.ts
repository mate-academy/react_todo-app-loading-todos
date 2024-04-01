import { FilterOptions } from '../enums/FilteredTodo';
import { Todo } from '../types/Todo';

export const hendleFilteredTodos = (
  todos: Todo[],
  filterSelected: FilterOptions,
) => {
  switch (filterSelected) {
    case FilterOptions.active:
      return todos.filter(todo => !todo.completed);
    case FilterOptions.completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};
