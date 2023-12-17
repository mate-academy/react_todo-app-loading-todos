import { Todo } from './types/Todo';

export enum FilteredBy {
  DefaultType = '',
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type FilterType = string;

export function filteredTodoList(
  todos: Todo[],
  filterBy: FilterType,
) {
  const filteredTodos = [...todos];

  switch (filterBy) {
    case FilteredBy.Active:
      return filteredTodos.filter(todo => !todo.completed);
    case FilteredBy.Completed:
      return filteredTodos.filter(todo => todo.completed);
    case FilteredBy.All:
    default:
      return filteredTodos;
  }
}
