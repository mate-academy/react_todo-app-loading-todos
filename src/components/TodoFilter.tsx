import React from 'react';
import cn from 'classnames';

import { Status } from '../types/Status';

type Props = {
  filter: Status;
  setFilter: (status: Status) => void;
};

export const TodoFilter: React.FC<Props> = ({ filter, setFilter }) => (
  <>
    {/* Active link should have the 'selected' class */}
    <nav className="filter" data-cy="Filter">
      <a
        onClick={() => setFilter(Status.All)}
        href="#/"
        className={cn('filter__link', {
          selected: filter === Status.All,
        })}
        data-cy="FilterLinkAll"
      >
        All
      </a>

      <a
        onClick={() => setFilter(Status.Active)}
        href="#/active"
        className={cn('filter__link', {
          selected: filter === Status.Active,
        })}
        data-cy="FilterLinkActive"
      >
        Active
      </a>

      <a
        onClick={() => setFilter(Status.Completed)}
        href="#/completed"
        className={cn('filter__link', {
          selected: filter === Status.Completed,
        })}
        data-cy="FilterLinkCompleted"
      >
        Completed
      </a>
    </nav>
  </>
);
