import { FilterType } from '../types/ErrorType';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (todos: Todo[], status: FilterType) => {
  switch (status) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};
