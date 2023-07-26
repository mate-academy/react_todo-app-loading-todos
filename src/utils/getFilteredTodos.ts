import { FilterOptions } from '../types/FillterOptions';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (todos: Todo[], filterBy: FilterOptions) => {
  const filteredTodos = todos.filter(todo => {
    switch (filterBy) {
      case FilterOptions.Active:
        return !todo.completed;

      case FilterOptions.Completed:
        return todo.completed;

      case FilterOptions.All:
      default:
        return todo;
    }
  });

  return filteredTodos;
};
