import cn from 'classnames';
import { FilterState } from '../../types/FilterStates';

interface FooterProps {
  itemsLeft: number;
  filterState: FilterState;
  onFilter: (filterState: FilterState) => void;
}

export const Footer: React.FC<FooterProps> = ({
  itemsLeft,
  filterState,
  onFilter,
}) => {
  return (
    <>
      {/* Hide the footer if there are no todos */}
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {itemsLeft} items left
        </span>

        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={cn('filter__link', {
              selected: filterState === 'All',
            })}
            data-cy="FilterLinkAll"
            onClick={() => onFilter('All')}
          >
            All
          </a>

          <a
            href="#/active"
            className={cn('filter__link', {
              selected: filterState === 'Active',
            })}
            data-cy="FilterLinkActive"
            onClick={() => onFilter('Active')}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={cn('filter__link', {
              selected: filterState === 'Completed',
            })}
            data-cy="FilterLinkCompleted"
            onClick={() => onFilter('Completed')}
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
    </>
  );
};
