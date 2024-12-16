import { Filters } from '../types/Filters';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], filter: Filters): Todo[] => {
  switch (filter) {
    case Filters.Active:
      return todos.filter(todo => !todo.completed);

    case Filters.Completed:
      return todos.filter(todo => todo.completed);

    case Filters.All:
    default:
      return todos;
  }
};
