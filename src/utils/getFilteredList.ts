import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export const getFilteredList = (
  currentFilter: Filter,
  todosList: Todo[] | null,
): Todo[] | null => {
  if (currentFilter === 'All') {
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
