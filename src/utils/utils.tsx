import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export function filterTodos(todos: Todo[], filter: Filter) {
  switch (filter) {
    case Filter.active:
      return todos.filter(todo => !todo.completed);
    case Filter.completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}

export function countCompletedTodos(todos: Todo[]) {
  return todos.filter(todo => todo.completed).length;
}
