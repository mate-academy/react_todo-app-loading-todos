import { Filters } from '../types/Filters';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], filter: Filters) => {
  return todos.filter(todo => {
    switch (filter) {
      case Filters.All:
        return todo;
      case Filters.Completed:
        return todo.completed;
      case Filters.Active:
        return !todo.completed;
      default:
        return todo;
    }
  });
};
