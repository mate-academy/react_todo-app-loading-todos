import React from 'react';
import cn from 'classnames';
import { useTodos } from '../../utils/TodoContext';
import { Filter } from '../../types/Filter';

export const TodoFilter: React.FC = () => {
  const { filter, setFilter } = useTodos();

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        data-cy="FilterLinkAll"
        className={cn('filter__link', {
          selected: filter === Filter.ALL,
        })}
        onClick={() => setFilter(Filter.ALL)}
      >
        All
      </a>

      <a
        href="#/active"
        data-cy="FilterLinkActive"
        className={cn('filter__link', {
          selected: filter === Filter.ACTIVE,
        })}
        onClick={() => setFilter(Filter.ACTIVE)}
      >
        Active
      </a>

      <a
        href="#/completed"
        data-cy="FilterLinkCompleted"
        className={cn('filter__link', {
          selected: filter === Filter.COMPLETED,
        })}
        onClick={() => setFilter(Filter.COMPLETED)}
      >
        Completed
      </a>
    </nav>
  );
};
