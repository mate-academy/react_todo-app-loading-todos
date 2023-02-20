import { Todo } from '../types/Todo';
import { Filter } from '../types/filter';

export const getVisibleTodos = (todos: Todo[], filterBy: Filter): Todo[] => {
  return todos.filter(todo => {
    switch (filterBy) {
      case Filter.ALL:
        return todo;
      case Filter.COMPLETED:
        return todo.completed;
      case Filter.ACTIVE:
        return !todo.completed;
      default:
        throw Error('Something wrong');
    }
  });
};
