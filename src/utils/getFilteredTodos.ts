import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todosFromServer: Todo[],
  filterBy: FilterType,
) => {
  const filteredTodos = [...todosFromServer];

  switch (filterBy) {
    case FilterType.Active:
      return filteredTodos.filter(todo => !todo.completed);

    case FilterType.Completed:
      return filteredTodos.filter(todo => todo.completed);

    default:
      return filteredTodos;
  }
};
