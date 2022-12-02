import classNames from 'classnames';
import React, { useContext } from 'react';
import { AppContext } from './AppContext';

export const Filter: React.FC = () => {
  const { setFilter, filter } = useContext(AppContext);

  return (
    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={classNames('filter__link', {
          selected: filter === 'all',
        })}
        onClick={() => setFilter('all')}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className={classNames('filter__link', {
          selected: filter === 'active',
        })}
        onClick={() => setFilter('active')}
      >
        Active
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className={classNames('filter__link', {
          selected: filter === 'completed',
        })}
        onClick={() => setFilter('completed')}
      >
        Completed
      </a>
    </nav>
  );
};
