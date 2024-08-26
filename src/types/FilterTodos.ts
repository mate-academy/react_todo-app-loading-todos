import { Todo } from './Todo';
import { Filter } from './Filter';

export const filterTodos = (todos: Todo[], filterStatus: Filter): Todo[] => {
  return todos.filter(todo => {
    switch (filterStatus) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return true;
    }
  });
};
