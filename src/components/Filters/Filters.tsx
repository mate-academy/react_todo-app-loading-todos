import React from 'react';
import classNames from 'classnames';
import { StatusFilter } from '../../types/Todo';

export const Filters: React.FC<{
  filter: StatusFilter;
  setFilter: React.Dispatch<React.SetStateAction<StatusFilter>>;
}> = ({ filter, setFilter }) => (
  <nav className="filter" data-cy="Filter">
    <a
      href="#/"
      className={classNames(
        'filter__link',
        {
          selected: filter === StatusFilter.All,
        },
      )}
      data-cy="FilterLinkAll"
      onClick={() => setFilter(StatusFilter.All)}
    >
      All
    </a>

    <a
      href="#/active"
      className={classNames(
        'filter__link',
        {
          selected: filter === StatusFilter.Active,
        },
      )}
      data-cy="FilterLinkActive"
      onClick={() => setFilter(StatusFilter.Active)}
    >
      Active
    </a>

    <a
      href="#/completed"
      className={classNames(
        'filter__link',
        {
          selected: filter === StatusFilter.Completed,
        },
      )}
      data-cy="FilterLinkCompleted"
      onClick={() => setFilter(StatusFilter.Completed)}
    >
      Completed
    </a>
  </nav>
);
