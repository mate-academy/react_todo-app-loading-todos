import { FilterStatus } from '../enums/FilterStatus';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], filter: FilterStatus): Todo[] => {
  switch (filter) {
    case FilterStatus.Active:
      return todos.filter(todo => !todo.completed);
    case FilterStatus.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};
