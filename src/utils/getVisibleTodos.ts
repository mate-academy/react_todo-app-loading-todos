import { Todo } from '../types/Todo';
import { FilterBy } from '../types/FilterBy';

export const getVisibleTodos = (todos: Todo[], filterType: FilterBy) => (
  todos.filter(todo => {
    switch (filterType) {
      case FilterBy.ALL:
        return true;

      case FilterBy.ACTIVE:
        return !todo.completed;

      case FilterBy.COMPLETED:
        return todo.completed;

      default:
        throw new Error('error!');
    }
  })
);
