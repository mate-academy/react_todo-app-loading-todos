import { Filters } from '../types/Filters';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  initialTodos: Todo[],
  status: string,
): Todo[] => {
  switch (status) {
    case Filters.All: {
      return initialTodos;
    }

    case Filters.Active: {
      return initialTodos.filter((todo: Todo) => !todo.completed);
    }

    case Filters.Completed: {
      return initialTodos.filter((todo: Todo) => todo.completed);
    }
  }

  return initialTodos;
};
