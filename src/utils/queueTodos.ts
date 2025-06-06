import { Todo } from '../types/Todo';
import { TodoFilter } from '../types/TodoFilter';

export const filteringTodos = (todos: Todo[], filter: TodoFilter) => {
  const filteredTodos = [...todos];

  switch (filter) {
    case 'Active':
      return filteredTodos.filter(todo => !todo.completed);
    case 'Completed':
      return filteredTodos.filter(todo => todo.completed);
    default:
      return filteredTodos;
  }
};
