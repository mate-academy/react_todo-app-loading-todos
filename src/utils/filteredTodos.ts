import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filterTodos = (todos:Todo[], filter:Status) => {
  return todos.filter(todo => {
    switch (filter) {
      case Status.ACTIVE:
        return !todo.completed;
      case Status.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });
};
