import { Filter } from './Filter';
import { Todo } from './Todo';

export interface State {
  userId: number,
  todos: Todo[],
  filterBy: Filter,
  errorMessage: string,
}
