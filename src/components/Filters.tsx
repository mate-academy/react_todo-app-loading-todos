import React from 'react';
import cn from 'classnames';
import { Filters } from '../types/filters';

type FiltersProps = {
  value: Filters;
  onChange: (filter: Filters) => void;
};

export const Filter: React.FC<FiltersProps> = ({ value, onChange }) => {
  const handleChangeFilter = (newFilter: Filters) => {
    if (newFilter !== value) {
      onChange(newFilter);
    }
  };

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={cn('filter__link', { selected: value === Filters.All })}
        data-cy="FilterLinkAll"
        onClick={() => {
          handleChangeFilter(Filters.All);
        }}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', { selected: value === Filters.Active })}
        data-cy="FilterLinkActive"
        onClick={() => {
          handleChangeFilter(Filters.Active);
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: value === Filters.Completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => {
          handleChangeFilter(Filters.Completed);
        }}
      >
        Completed
      </a>
    </nav>
  );
};
