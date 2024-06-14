import { Filter } from '../types/state';

export const filterAction = [
  { title: 'All', action: Filter.all },
  { title: 'Active', action: Filter.active },
  { title: 'Completed', action: Filter.completed },
];
