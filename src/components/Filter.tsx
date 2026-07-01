import React from 'react';
import classNames from 'classnames';

import { FilterStatus } from '../types/FilterStatus';

interface Props {
  filter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

const filterOptions = [
  {
    href: '#/',
    status: FilterStatus.ALL,
    dataCy: 'FilterLinkAll',
    label: 'All',
  },
  {
    href: '#/active',
    status: FilterStatus.ACTIVE,
    dataCy: 'FilterLinkActive',
    label: 'Active',
  },
  {
    href: '#/completed',
    status: FilterStatus.COMPLETED,
    dataCy: 'FilterLinkCompleted',
    label: 'Completed',
  },
];

export const Filter: React.FC<Props> = ({ filter, onFilterChange }) => {
  return (
    <nav className="filter" data-cy="Filter">
      {filterOptions.map(({ href, status, dataCy, label }) => (
        <a
          key={status}
          href={href}
          className={classNames('filter__link', {
            selected: filter === status,
          })}
          data-cy={dataCy}
          onClick={() => onFilterChange(status)}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};
