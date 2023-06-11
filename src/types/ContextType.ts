import { Todo } from './Todo';
import { FilterType } from './FilterType';

export interface ContextType {
  todos: Todo[] | [],
  loading: boolean,
  loadingError: string,
  filterType: FilterType | string,
  setFilterType(p: FilterType): void,
  visibleTodos: Todo[] | [],
  activeTodos: Todo[] | [],
}
