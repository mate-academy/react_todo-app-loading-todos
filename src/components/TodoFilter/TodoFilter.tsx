import React from 'react';
import cn from 'classnames';
import { Filter } from '../../types/Filter';

type Props = {
  filterField: Filter;
  setFilterField: (filterField: Filter) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterField,
  setFilterField,
}) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={cn('filter__link', {
          selected: filterField === Filter.All,
        })}
        data-cy="FilterLinkAll"
        onClick={() => setFilterField(Filter.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', {
          selected: filterField === Filter.Active,
        })}
        data-cy="FilterLinkActive"
        onClick={() => setFilterField(Filter.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: filterField === Filter.Completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => setFilterField(Filter.Completed)}
      >
        Completed
      </a>
    </nav>
  );
};
