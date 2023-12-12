import { Status } from './types/Status';
import { Todo } from './types/Todo';

type Arguments = {
  status: string,
  todos: Todo[],
};

export const prepareTodos = ({
  todos,
  status,
}: Arguments) => {
  let preparedTodos = todos;

  switch (status) {
    case Status.active:
      preparedTodos = preparedTodos.filter(todo => (
        !todo.completed
      ));
      break;

    case Status.completed:
      preparedTodos = preparedTodos.filter(todo => (
        todo.completed
      ));
      break;

    default:
      return preparedTodos;
  }

  return preparedTodos;
};
