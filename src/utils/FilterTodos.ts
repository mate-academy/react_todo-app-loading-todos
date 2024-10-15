import { Todo } from '../types/Todo';
import { FilterBy } from '../types/FilterBy';

export const filterTodos = (todos: Todo[], selectedFilter: FilterBy) => {
  switch (selectedFilter) {
    case FilterBy.ACTIVE:
      return todos.filter(todo => !todo.completed);

    case FilterBy.COMPLETED:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};
