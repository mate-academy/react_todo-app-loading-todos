import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], filterBy: Filter) => {
  const filteredTodos = todos.filter(todo => {
    switch (filterBy) {
      case Filter.ALL:
        return todo;
      case Filter.ACTIVE:
        return todo.completed === false;
      case Filter.COMPLETED:
        return todo.completed === true;
      default:
        return false;
    }
  });

  return filteredTodos;
};
