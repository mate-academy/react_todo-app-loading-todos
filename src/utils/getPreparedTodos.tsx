import { Todo } from '../types/Todo';
import { CompletedStatus } from '../types/CompletedStatus';

export const getPreparedTodos = (
  todos: Todo[],
  { filterByStatus }: { filterByStatus: CompletedStatus },
) => {
  let preparedTodos = [...todos];

  if (filterByStatus) {
    switch (filterByStatus) {
      case CompletedStatus.Active:
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
        break;

      case CompletedStatus.Completed:
        preparedTodos = preparedTodos.filter(todo => todo.completed);
    }
  }

  return preparedTodos;
};
