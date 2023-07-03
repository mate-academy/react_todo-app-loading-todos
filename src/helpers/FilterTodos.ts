import { Filters } from '../types/Filters';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], filter: Filters) => {
  return todos.filter(todo => {
    switch (filter) {
      case 'completed':
        return todo.completed;
      case 'active':
        return !todo.completed;
      default:
        return todo;
    }
  });
};
