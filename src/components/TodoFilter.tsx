import React from 'react';
import classNames from 'classnames';
import { Filter } from '../types/Filter';

type Props = {
  filterBy: Filter;
  setFilterBy: (filter: Filter) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  setFilterBy,
}) => {
  const onFilterChange = (filter: Filter) => (e: Event) => {
    e.preventDefault();
    setFilterBy(filter);
  };

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filterBy === 'all',
        })}
        data-cy="FilterLinkAll"
        onClick={
          () => onFilterChange(Filter.all)
        }
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filterBy === 'active',
        })}
        data-cy="FilterLinkActive"
        onClick={
          () => onFilterChange(Filter.active)
        }
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filterBy === 'completed',
        })}
        data-cy="FilterLinkCompleted"
        onClick={
          () => onFilterChange(Filter.completed)
        }
      >
        Completed
      </a>
    </nav>
  );
};
