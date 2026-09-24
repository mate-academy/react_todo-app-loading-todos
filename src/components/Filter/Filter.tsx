import React from 'react';
import cn from 'classnames';

import { FilterType } from '../../types/Todo';

type Props = {
  filter: FilterType;
  handleFilter: (
    event: React.MouseEvent<HTMLAnchorElement>,
    filter: FilterType,
  ) => void;
};

export const Filter: React.FC<Props> = ({ filter, handleFilter }) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={cn('filter__link', {
          selected: filter === 'all',
        })}
        data-cy="FilterLinkAll"
        onClick={event => handleFilter(event, 'all')}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', {
          selected: filter === 'active',
        })}
        data-cy="FilterLinkActive"
        onClick={event => handleFilter(event, 'active')}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: filter === 'completed',
        })}
        data-cy="FilterLinkCompleted"
        onClick={event => handleFilter(event, 'completed')}
      >
        Completed
      </a>
    </nav>
  );
};
