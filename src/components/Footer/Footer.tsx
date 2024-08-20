import cn from 'classnames';
import { Filter } from '../../types/Filter';

type Props = {
  onSetFilter: (filter: Filter) => void;
  activeListLength?: number;
  filter: Filter;
};

export const Footer: React.FC<Props> = ({
  onSetFilter,
  activeListLength,
  filter,
}) => {
  function handleFilter(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const newFilter = event.currentTarget.textContent as Filter;

    onSetFilter(newFilter);
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeListLength} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filter === 'All' })}
          data-cy="FilterLinkAll"
          onClick={handleFilter}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filter === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={handleFilter}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={handleFilter}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
