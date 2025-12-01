import React from 'react';
import { FilterStatus } from '../types/FilterStatus';

type Props = {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
};

export const Filter: React.FC<Props> = ({
  currentFilter,
  onFilterChange,
}) => {
  return (
    <ul className="filters" data-cy="Filter">
      <li>
        <a
          href="#/"
          className={currentFilter === FilterStatus.All ? 'selected' : ''}
          onClick={() => onFilterChange(FilterStatus.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={currentFilter === FilterStatus.Active ? 'selected' : ''}
          onClick={() => onFilterChange(FilterStatus.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={currentFilter === FilterStatus.Completed ? 'selected' : ''}
          onClick={() => onFilterChange(FilterStatus.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
