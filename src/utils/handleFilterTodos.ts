import { Filters } from '../types/Filters';
import { Todo } from '../types/Todo';

export const handleFilterTodos = (todos: Todo[], filterField: string) => {
  let resTodos = [...todos];

  switch (filterField) {
    case Filters.Active:
      resTodos = resTodos.filter(todo => todo.completed === false);

      break;

    case Filters.Completed:
      resTodos = resTodos.filter(todo => todo.completed === true);

      break;

    default:
      break;
  }

  return resTodos;
};
