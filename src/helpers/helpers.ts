import { Todo } from '../components/TodoItem/Todo';
import { FilterType } from '../types/FilterType';

export const getFilteredTodos = (todos: Todo[], filterType: FilterType) => {
  return todos.filter(todo => {
    switch (filterType) {
      case FilterType.ACTIVE:
        return !todo.completed;

      case FilterType.COMPLETED:
        return todo.completed;

      default:
        return todos;
    }
  });
};
