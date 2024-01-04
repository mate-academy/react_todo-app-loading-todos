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
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filterBy === 'all',
        })}
        data-cy="FilterLinkAll"
        onClick={(e) => {
          e.preventDefault();
          setFilterBy(Filter.all);
        }}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filterBy === 'active',
        })}
        data-cy="FilterLinkActive"
        onClick={(e) => {
          e.preventDefault();
          setFilterBy(Filter.active);
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filterBy === 'completed',
        })}
        data-cy="FilterLinkCompleted"
        onClick={(e) => {
          e.preventDefault();
          setFilterBy(Filter.completed);
        }}
      >
        Completed
      </a>
    </nav>
  );
};
