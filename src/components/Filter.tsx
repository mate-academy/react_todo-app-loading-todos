import { FC, memo } from 'react';
import cn from 'classnames';

const filterStatuses = {
  All: 'All',
  Active: 'Active',
  Completed: 'Completed',
};

interface Props {
  filterStatus: string,
  onStatusFilterChange: React.Dispatch<React.SetStateAction<string>>,
}

export const Filter: FC<Props> = memo(
  ({ filterStatus, onStatusFilterChange }) => (
    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={cn(
          'filter__link',
          { selected: filterStatus === filterStatuses.All },
        )}
        onClick={() => onStatusFilterChange(filterStatuses.All)}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className={cn(
          'filter__link',
          { selected: filterStatus === filterStatuses.Active },
        )}
        onClick={() => onStatusFilterChange(filterStatuses.Active)}
      >
        Active
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className={cn(
          'filter__link',
          { selected: filterStatus === filterStatuses.Completed },
        )}
        onClick={() => onStatusFilterChange(filterStatuses.Completed)}
      >
        Completed
      </a>
    </nav>
  ),
);
