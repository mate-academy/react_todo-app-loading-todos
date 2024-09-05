import { TodoFilter } from '../types/TodoFilter';
import { Todo } from '../types/Todo';

export const getFilteredList = (
  currentFilter: TodoFilter,
  todosList: Todo[] | null,
): Todo[] | null => {
  if (currentFilter === TodoFilter.All) {
    return todosList || null;
  }

  return (
    todosList?.filter(({ completed }) => {
      if (currentFilter === 'Active') {
        return !completed;
      }

      return completed;
    }) || null
  );
};
