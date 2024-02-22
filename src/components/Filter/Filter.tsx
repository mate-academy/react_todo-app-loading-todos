import cl from 'classnames';
import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  setFilter: (s: Status) => void;
  filter: Status;
};

export const Filter: React.FC<Props> = ({ setFilter, filter }) => {
  const choiceFilter = (st: Status) => setFilter(st);

  return (
    <nav className="filter" data-cy="Filter">
      {/* Active link should have the 'selected' class */}

      <a
        href="#/"
        className={cl('filter__link', {
          selected: filter === Status.ALL,
        })}
        data-cy="FilterLinkAll"
        onClick={() => choiceFilter(Status.ALL)}
      >
        All
      </a>

      <a
        href="#/active"
        className={cl('filter__link', {
          selected: filter === Status.ACTIVE,
        })}
        data-cy="FilterLinkActive"
        onClick={() => choiceFilter(Status.ACTIVE)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cl('filter__link', {
          selected: filter === Status.COMPLETED,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => choiceFilter(Status.COMPLETED)}
      >
        Completed
      </a>
    </nav>
  );
};
