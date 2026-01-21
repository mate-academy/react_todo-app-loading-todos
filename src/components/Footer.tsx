import React from 'react';
import classNames from 'classnames';
import { FILTERS, FilterType } from '../constants/filters';

type Props = {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  todosLeft: number;
};

export const Footer: React.FC<Props> = ({
  filter,
  onFilterChange,
  todosLeft,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosLeft} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          data-cy="FilterLinkAll"
          className={classNames('filter__link', {
            selected: filter === FILTERS.all,
          })}
          onClick={() => onFilterChange(FILTERS.all)}
        >
          All
        </a>

        <a
          href="#/active"
          data-cy="FilterLinkActive"
          className={classNames('filter__link', {
            selected: filter === FILTERS.active,
          })}
          onClick={() => onFilterChange(FILTERS.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          data-cy="FilterLinkCompleted"
          className={classNames('filter__link', {
            selected: filter === FILTERS.completed,
          })}
          onClick={() => onFilterChange(FILTERS.completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled
      >
        Clear completed
      </button>
    </footer>
  );
};
