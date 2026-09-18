import React from 'react';
import cn from 'classnames';
import { FILTERS, FilterType } from '../constants/filters';

type Props = {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

export const Filter: React.FC<Props> = ({ filter, onFilterChange }) => {
  const handleFilterChange = (
    event: React.MouseEvent<HTMLAnchorElement>,
    selectedFilter: FilterType,
  ) => {
    event.preventDefault();
    onFilterChange(selectedFilter);
  };

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={cn('filter__link', {
          selected: filter === FILTERS.all,
        })}
        data-cy="FilterLinkAll"
        onClick={event => handleFilterChange(event, FILTERS.all)}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', { selected: filter === FILTERS.active })}
        data-cy="FilterLinkActive"
        onClick={event => handleFilterChange(event, FILTERS.active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: filter === FILTERS.completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={event => handleFilterChange(event, FILTERS.completed)}
      >
        Completed
      </a>
    </nav>
  );
};
