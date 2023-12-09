import { Todo } from '../types/Todo';
import { Filter, FilterTitles } from '../types/Filter';

export const filterTodos = (todosToFilter: Todo[], filter: Filter) => {
  switch (filter.title) {
    case FilterTitles.All:
    default:
      return todosToFilter;

    case FilterTitles.Active:
      return todosToFilter.filter(todo => !todo.completed);

    case FilterTitles.Completed:
      return todosToFilter.filter(todo => todo.completed);
  }
};
