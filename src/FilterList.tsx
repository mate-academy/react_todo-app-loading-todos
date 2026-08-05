import React from 'react';
import { FilterType } from './types/FilterType';

type Props = {
  filter: FilterType;
  onFilterChange: (filterType: FilterType) => void;
};

const FILTERS: FilterType[] = ['all', 'active', 'completed'];

export const FilterList: React.FC<Props> = ({ filter, onFilterChange }) => {
  const handleFilterClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    filterType: FilterType,
  ) => {
    event.preventDefault();
    onFilterChange(filterType);
  };

  return (
    <nav className="filter" data-cy="Filter">
      {FILTERS.map(filterType => (
        <a
          key={filterType}
          href={filterType === 'all' ? '#/' : `#/${filterType}`}
          className={`filter__link ${filter === filterType ? 'selected' : ''}`}
          data-cy={
            filterType === 'all'
              ? 'FilterLinkAll'
              : filterType === 'active'
                ? 'FilterLinkActive'
                : 'FilterLinkCompleted'
          }
          onClick={event => handleFilterClick(event, filterType)}
        >
          {filterType === 'all'
            ? 'All'
            : filterType === 'active'
              ? 'Active'
              : 'Completed'}
        </a>
      ))}
    </nav>
  );
};
