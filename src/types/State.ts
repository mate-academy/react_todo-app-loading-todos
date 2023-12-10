import { Todo } from './Todo';
import { Filter } from './Filter';
import { Error } from './Error';

export type State = {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: Filter;
  error: Error | '';
};
