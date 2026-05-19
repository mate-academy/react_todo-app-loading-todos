import classNames from 'classnames';
import { FilterOption } from '../../types/FilterOption';

interface Props {
  allCompleted: boolean;
  activeTodosCount: number;
  filter: FilterOption;
  onSelectFilter: (filter: FilterOption) => void;
}

export const TodoAppFooter = ({
  allCompleted,
  activeTodosCount,
  filter,
  onSelectFilter,
}: Props) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeTodosCount} items left
    </span>

    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filter === FilterOption.ALL,
        })}
        onClick={() => onSelectFilter(FilterOption.ALL)}
        data-cy="FilterLinkAll"
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filter === FilterOption.ACTIVE,
        })}
        onClick={() => onSelectFilter(FilterOption.ACTIVE)}
        data-cy="FilterLinkActive"
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filter === FilterOption.COMPLETED,
        })}
        onClick={() => onSelectFilter(FilterOption.COMPLETED)}
        data-cy="FilterLinkCompleted"
      >
        Completed
      </a>
    </nav>

    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={!allCompleted}
    >
      Clear completed
    </button>
  </footer>
);
