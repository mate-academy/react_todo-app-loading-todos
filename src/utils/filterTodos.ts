import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function prepareTodos(allTodos: Todo[], filterBy: Status) {
  const filteredTodos = [...allTodos];

  switch (filterBy) {
    case Status.active:
      return filteredTodos.filter(todo => !todo.completed);

    case Status.completed:
      return filteredTodos.filter(todo => todo.completed);

    default:
      return filteredTodos;
  }
}
