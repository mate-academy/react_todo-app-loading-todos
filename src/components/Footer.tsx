import { FC, MouseEvent } from 'react';
import cn from 'classnames';

type Filter = 'All' | 'Active' | 'Completed';

type Props = {
  activeTodosNum: number | undefined,
  selectedFilter: Filter,
  handleFilterChange: (event: MouseEvent<HTMLAnchorElement>) => void
};

export const Footer: FC<Props> = ({
  activeTodosNum = 0, selectedFilter, handleFilterChange,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      { `${activeTodosNum} items left`}
    </span>

    {/* Active filter should have a 'selected' class */}
    <nav className="filter" data-cy="Filter">
      <a
        id="All"
        href="#/"
        className={cn('filter__link', {
          selected: selectedFilter === 'All',
        })}
        data-cy="FilterLinkAll"
        onClick={handleFilterChange}
      >
        All
      </a>

      <a
        id="Active"
        href="#/active"
        className={cn('filter__link', {
          selected: selectedFilter === 'Active',
        })}
        data-cy="FilterLinkActive"
        onClick={handleFilterChange}
      >
        Active
      </a>

      <a
        id="Completed"
        href="#/completed"
        className={cn('filter__link', {
          selected: selectedFilter === 'Completed',
        })}
        data-cy="FilterLinkCompleted"
        onClick={handleFilterChange}
      >
        Completed
      </a>
    </nav>

    {/* don't show this button if there are no completed todos */}
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
    >
      Clear completed
    </button>
  </footer>
);
