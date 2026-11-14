import React from 'react';
import cn from 'classnames';
import { Filter } from '../types/Filter';

type Props = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
};

const filterOptions = [
  {
    value: Filter.All,
    label: 'All',
    href: '#/',
    dataCy: 'FilterLinkAll',
  },
  {
    value: Filter.Active,
    label: 'Active',
    href: '#/active',
    dataCy: 'FilterLinkActive',
  },
  {
    value: Filter.Completed,
    label: 'Completed',
    href: '#/completed',
    dataCy: 'FilterLinkCompleted',
  },
];

export const TodoFilter: React.FC<Props> = ({ filter, onFilterChange }) => (
  <nav className="filter" data-cy="Filter">
    {filterOptions.map(option => (
      <a
        key={option.value}
        href={option.href}
        data-cy={option.dataCy}
        className={cn('filter__link', {
          selected: filter === option.value,
        })}
        onClick={() => onFilterChange(option.value)}
      >
        {option.label}
      </a>
    ))}
  </nav>
);
