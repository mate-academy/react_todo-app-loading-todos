import { StatusFilter } from '../types/StatusFilter';
import { Todo } from '../types/Todo';

// filters Todo list using certain status as a filter
export const filterTodos = (status: StatusFilter, todos: Todo[]) => {
  return todos.filter(todo => {
    if (status === StatusFilter.Completed) {
      return todo.completed;
    }

    if (status === StatusFilter.Active) {
      return !todo.completed;
    }

    return true;
  });
};
