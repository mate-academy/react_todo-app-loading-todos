import { FilterBy } from '../enums/FilterBy';
import { Status } from '../enums/Status';
import { Todo } from './Todo';

export type State = {
  todos: Todo[];
  sortBy: FilterBy;
  status: Status;
};
