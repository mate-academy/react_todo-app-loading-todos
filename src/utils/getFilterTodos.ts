import { FILTERS } from '../types/FILTERS';
import { Todo } from '../types/Todo';

export function getfilteredTodos(todos: Todo[], filter: string) {
  let preperedTodos = [...todos];

  switch (filter) {
    case FILTERS.active:
      preperedTodos = preperedTodos.filter(todo => !todo.completed);
      break;
    case FILTERS.completed:
      preperedTodos = preperedTodos.filter(todo => todo.completed);
  }

  return preperedTodos;
}

export function getActiveTodosLength(todos: Todo[]) {
  const count = todos.filter(todo => !todo.completed);

  return count.length;
}

export function getCompletedTodosLength(todos: Todo[]) {
  const count = todos.filter(todo => todo.completed);

  return count.length;
}
