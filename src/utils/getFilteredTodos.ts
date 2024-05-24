import { Todo } from '../types/Todo';
import { FilterBy } from '../types/FiilterBy';

type FilterTheTodos = (todos: Todo[], filterBy: FilterBy) => Todo[];

export const getFilteredTodos: FilterTheTodos = (todos, filterBy) => {
  if (filterBy === FilterBy.All) {
    return todos;
  }

  return todos.filter(todo => {
    switch (filterBy) {
      case FilterBy.Active:
        return !todo.completed;
      case FilterBy.Completed:
        return todo.completed;
      default:
        throw new Error('Unknown filter type');
    }
  });
};
