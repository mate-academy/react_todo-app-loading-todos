import { Filter, TodoFromServer } from '../types/state';

export const filterTodos = (
  todos: TodoFromServer[],
  filter: Filter,
): TodoFromServer[] => {
  switch (filter) {
    case Filter.active: {
      return todos.filter(todo => !todo.completed);
    }

    case Filter.completed: {
      return todos.filter(todo => todo.completed);
    }

    default:
      return todos;
  }
};
