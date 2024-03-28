import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getFilteredItems = (list: Todo[], query: Status) => {
  let filteredItems = [...list];

  switch (query) {
    case Status.Active:
      filteredItems = filteredItems.filter(item => !item.completed);
      break;
    case Status.Completed:
      filteredItems = filteredItems.filter(item => item.completed);
      break;
    default:
      break;
  }

  return filteredItems;
};
