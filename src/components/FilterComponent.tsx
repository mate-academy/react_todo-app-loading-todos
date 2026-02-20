import React from 'react';
import { Filter as FilterType, FILTERS } from '../types/Filters';
import classNames from 'classnames';

interface FilterProps {
  current: FilterType;
  onChange: (filter: FilterType) => void;
}

export const FilterComponent: React.FC<FilterProps> = ({
  current,
  onChange,
}) => {
  return (
    <nav className="filter" data-cy="Filter">
      {Object.values(FILTERS).map(filter => (
        <a
          key={filter}
          href={`#/${filter}`}
          className={classNames('filter__link', {
            selected: current === filter,
          })}
          data-cy={`FilterLink${filter[0].toUpperCase() + filter.slice(1)}`}
          onClick={event => {
            event.preventDefault();
            onChange(filter);
          }}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </a>
      ))}
    </nav>
  );
};
