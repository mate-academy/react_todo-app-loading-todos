import { Data, FilterBy } from './types/types';

export const filteredData = <T>(
  data: Array<T & Data>,
  filter: FilterBy,
): T[] => {
  if (filter === FilterBy.Active) {
    return data.filter(({ completed }) => !completed);
  }

  if (filter === FilterBy.Completed) {
    return data.filter(({ completed }) => completed);
  }

  return data;
};
