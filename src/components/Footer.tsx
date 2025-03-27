import { FilterOptions } from '../types/FilterOptions';
import { Todo } from '../types/Todo';
import { Filter } from './Filter';

interface Props {
  todosToUse: Todo[];
  activeFilter: FilterOptions;
  handleFilterChange: (newFilter: FilterOptions) => void;
}

export const Footer = ({
  todosToUse,
  activeFilter,
  handleFilterChange,
}: Props) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {todosToUse.filter((todo: Todo) => !todo.completed).length} items left
    </span>

    <Filter
      activeFilter={activeFilter}
      handleFilterChange={(string: FilterOptions) => handleFilterChange(string)}
    />

    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={todosToUse.every((todo: Todo) => !todo.completed)}
    >
      Clear completed
    </button>
  </footer>
);
