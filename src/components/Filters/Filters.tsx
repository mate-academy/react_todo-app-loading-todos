import React from 'react';
import { StatusFilter } from '../../types/Todo';

export const Filters: React.FC<{
  filter: StatusFilter;
  setFilter: React.Dispatch<React.SetStateAction<StatusFilter>>
}> = ({ filter, setFilter }) => (
  <nav className="filter" data-cy="Filter">
    <a
      href="#/"
      className={
        `filter__link
              ${filter === StatusFilter.All ? 'selected' : ''}
            `
      }
      data-cy="FilterLinkAll"
      onClick={() => setFilter(StatusFilter.All)}
    >
      All
    </a>

    <a
      href="#/active"
      className={
        `filter__link
              ${filter === StatusFilter.Active ? 'selected' : ''}
            `
      }
      data-cy="FilterLinkActive"
      onClick={() => setFilter(StatusFilter.Active)}
    >
      Active
    </a>

    <a
      href="#/completed"
      className={
        `filter__link
              ${filter === StatusFilter.Completed ? 'selected' : ''}
            `
      }
      data-cy="FilterLinkCompleted"
      onClick={() => setFilter(StatusFilter.Completed)}
    >
      Completed
    </a>
  </nav>
);
