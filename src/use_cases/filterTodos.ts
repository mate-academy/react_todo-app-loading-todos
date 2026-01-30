import { FilterState } from '../App';
import { Todo } from '../types/Todo';

export function filterTodos(
  filterState: FilterState,
  searchQuery: string,
  todos?: Todo[],
) {
  let resTodos = todos;

  if (filterState !== FilterState.All) {
    resTodos = resTodos?.filter(
      todo =>
        (filterState === FilterState.Completed && todo.completed) ||
        (filterState === FilterState.Active && !todo.completed),
    );
  }

  if (searchQuery) {
    resTodos = resTodos?.filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()),
    );
  }

  return resTodos;
}
