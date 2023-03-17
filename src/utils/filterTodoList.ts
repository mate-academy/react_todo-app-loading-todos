import { Todo } from '../types/Todo';
import { FilterStatus } from '../types/filterStatus';

export function filterTodoList(array: Todo[], filterBy: string): Todo[] {
  if (filterBy === 'all') {
    return array;
  }

  return array.filter(({ completed }) => {
    if (filterBy === FilterStatus.Active) {
      return !completed;
    }

    return completed;
  });
}

export const getMountCompletedTodos = (todos: Todo[]): number => {
  return todos.filter(({ completed }) => !completed).length;
};
