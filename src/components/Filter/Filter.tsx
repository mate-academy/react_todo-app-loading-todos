import React from 'react';

type Props = {
  filterBy: string,
  setFilterBy: (val: Filters) => void,
};

enum Filters {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

export const Filter: React.FC<Props> = ({
  filterBy,
  setFilterBy,
}) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={
          filterBy === 'all'
            ? 'filter__link selected'
            : 'filter__link'
        }
        onClick={() => setFilterBy(Filters.All)}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className={
          filterBy === 'active'
            ? 'filter__link selected'
            : 'filter__link'
        }
        onClick={() => setFilterBy(Filters.Active)}
      >
        Active
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className={
          filterBy === 'completed'
            ? 'filter__link selected'
            : 'filter__link'
        }
        onClick={() => setFilterBy(Filters.Completed)}
      >
        Completed
      </a>
    </nav>
  );
};
