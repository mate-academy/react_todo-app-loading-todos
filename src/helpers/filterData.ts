import { Todo } from '../types/Todo';
import { FilterType } from '../types/enums';

export const filterData = (data: Todo[], filter: string) => {
  switch (filter) {
    case FilterType.All:
      return data;
    case FilterType.Active:
      const completedFalse = data.filter(x => x.completed === false);

      return completedFalse;
    case FilterType.Completed:
      const completedTrue = data.filter(x => x.completed === true);

      return completedTrue;
    default:
      return data;
  }
};
