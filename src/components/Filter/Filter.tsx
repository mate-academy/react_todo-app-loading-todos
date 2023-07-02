import React from 'react';
import classNames from 'classnames';
import { Filtering } from '../../types/Filter';

interface Props {
  filter: Filtering;
  setFilter: (filter: Filtering) => void;
}

export const Filter: React.FC<Props> = ({
  filter,
  setFilter,
}) => {
  return (
    <nav className="filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filter === Filtering.ALL,
        })}
        onClick={() => setFilter(Filtering.ALL)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filter === Filtering.ACTIVE,
        })}
        onClick={() => setFilter(Filtering.ACTIVE)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filter === Filtering.COMPLETED,
        })}
        onClick={() => setFilter(Filtering.COMPLETED)}
      >
        Completed
      </a>
    </nav>
  );
};
