import React from 'react';
import classnames from 'classnames';
import { FILTERS, Status } from '../constants/todo';

interface FilterProps {
  status: Status;
  onStatusChange: (status: Status) => void;
}

export const Filter: React.FC<FilterProps> = ({ status, onStatusChange }) => (
  <nav className="filter" data-cy="Filter">
    {(Object.keys(FILTERS) as Status[]).map(filter => (
      <a
        key={filter}
        href={`#/${filter}`}
        className={classnames('filter__link', {
          selected: status === filter,
        })}
        data-cy={`FilterLink${filter.charAt(0).toUpperCase()}${filter.slice(1)}`}
        onClick={() => onStatusChange(filter)}
      >
        {filter.charAt(0).toUpperCase() + filter.slice(1)}
      </a>
    ))}
  </nav>
);
