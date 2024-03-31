import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getFilteredItems = (list: Todo[], query: Status) => {
  switch (query) {
    case Status.Active:
      return list.filter(item => !item.completed);
    case Status.Completed:
      return list.filter(item => item.completed);
    default:
      return list;
  }
};
