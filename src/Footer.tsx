import React from 'react';
import classNames from 'classnames';
import { FilterStatus } from './types/FilterStatus';

type Props = {
  active: number,
  filter: FilterStatus,
  setFilter(status: FilterStatus): void,
};

export const Footer: React.FC<Props> = ({
  active,
  filter,
  setFilter,
}) => (
  <footer className="todoapp__footer">
    <span className="todo-count">
      {`${active} items left`}
    </span>

    <nav className="filter">
      <a
        href="#/"
        className={classNames(
          'filter__link',
          { selected: filter === FilterStatus.all },
        )}
        onClick={() => {
          setFilter(FilterStatus.all);
        }}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames(
          'filter__link',
          { selected: filter === FilterStatus.active },
        )}
        onClick={() => {
          setFilter(FilterStatus.active);
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames(
          'filter__link',
          { selected: filter === FilterStatus.completed },
        )}
        onClick={() => {
          setFilter(FilterStatus.completed);
        }}
      >
        Completed
      </a>
    </nav>

    <button type="button" className="todoapp__clear-completed">
      Clear completed
    </button>
  </footer>
);
