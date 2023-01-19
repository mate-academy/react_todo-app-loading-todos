import { Todo } from './types/Todo';
import { Filter } from './types/filter';

export const getVisibleTodos = (todos: Todo[], filter: Filter) => (
  todos.filter(todo => {
    switch (filter) {
      case Filter.active:
        return !todo.completed;

      case Filter.completed:
        return todo.completed;

      default:
        return true;
    }
  }));
