import React from 'react';
import classNames from 'classnames';
import { Filter, FilterType } from '../types/FilterType';

interface Props {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const TodoFilter: React.FC<Props> = ({ filter, onFilterChange }) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filter === Filter.All,
        })}
        data-cy="FilterLinkAll"
        onClick={e => {
          e.preventDefault();
          onFilterChange(Filter.All);
        }}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filter === Filter.Active,
        })}
        data-cy="FilterLinkActive"
        onClick={e => {
          e.preventDefault();
          onFilterChange(Filter.Active);
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filter === Filter.Completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={e => {
          e.preventDefault();
          onFilterChange(Filter.Completed);
        }}
      >
        Completed
      </a>
    </nav>
  );
};
