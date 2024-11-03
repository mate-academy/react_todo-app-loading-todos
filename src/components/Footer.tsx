import React from 'react';
import cn from 'classnames';
import { Filter } from '../types/Filter';

type Props = {
  setFilter: (filter: Filter) => void;
  remainingCount: number;
  currentFilter: Filter;
};

export const Footer: React.FC<Props> = ({
  setFilter,
  remainingCount,
  currentFilter,
}) => {
  const handleFilter = (filter: Filter) => {
    setFilter(filter);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {remainingCount} {remainingCount === 1 ? 'item' : 'items'} left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: currentFilter === Filter.all,
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleFilter(Filter.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: currentFilter === Filter.active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleFilter(Filter.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: currentFilter === Filter.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleFilter(Filter.completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
