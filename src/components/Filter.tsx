import React from 'react';
import cn from 'classnames';
import { Filters } from '../constants/filter';

type Props = {
  filter: Filters;
  onSetFilter: (filter: Filters) => void;
};

export const Filter: React.FC<Props> = ({ filter, onSetFilter }) => (
  <nav className="filter" data-cy="Filter">
    <a
      href="#/"
      className={cn('filter__link', { selected: filter === Filters.all })}
      data-cy="FilterLinkAll"
      onClick={() => onSetFilter(Filters.all)}
    >
      All
    </a>

    <a
      href="#/active"
      className={cn('filter__link', { selected: filter === Filters.active })}
      data-cy="FilterLinkActive"
      onClick={() => onSetFilter(Filters.active)}
    >
      Active
    </a>

    <a
      href="#/completed"
      className={cn('filter__link', { selected: filter === Filters.completed })}
      data-cy="FilterLinkCompleted"
      onClick={() => onSetFilter(Filters.completed)}
    >
      Completed
    </a>
  </nav>
);
