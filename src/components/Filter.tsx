import React from 'react';
import classNames from 'classnames';

import { FilterStatus } from '../types/FilterStatus';

interface Props {
  filter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

export const Filter: React.FC<Props> = ({ filter, onFilterChange }) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filter === FilterStatus.ALL,
        })}
        data-cy="FilterLinkAll"
        onClick={() => onFilterChange(FilterStatus.ALL)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filter === FilterStatus.ACTIVE,
        })}
        data-cy="FilterLinkActive"
        onClick={() => onFilterChange(FilterStatus.ACTIVE)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filter === FilterStatus.COMPLETED,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => onFilterChange(FilterStatus.COMPLETED)}
      >
        Completed
      </a>
    </nav>
  );
};
