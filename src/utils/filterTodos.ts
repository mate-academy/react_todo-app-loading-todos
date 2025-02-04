import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

export const getFilteredTodos = (todos: Todo[], filterBy: Filter) => {
  const filteredTodos = [...todos];

  switch (filterBy) {
    case Filter.Active:
      return filteredTodos.filter(todo => !todo.completed);
    case Filter.Completed:
      return filteredTodos.filter(todo => todo.completed);
    default:
      return filteredTodos;
  }
};
