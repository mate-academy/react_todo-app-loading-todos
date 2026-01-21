import React from 'react';
import { FilterType } from '../types/FilterType';

interface Props {
  filter: FilterType;
  activeCount: number;
  completedCount: number;
  onFilterChange: (filter: FilterType) => void;
}

export const Footer: React.FC<Props> = ({
  filter,
  activeCount,
  completedCount,
  onFilterChange,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={
            filter === FilterType.All ? 'filter__link selected' : 'filter__link'
          }
          data-cy="FilterLinkAll"
          onClick={() => onFilterChange(FilterType.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={
            filter === FilterType.Active
              ? 'filter__link selected'
              : 'filter__link'
          }
          data-cy="FilterLinkActive"
          onClick={() => onFilterChange(FilterType.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={
            filter === FilterType.Completed
              ? 'filter__link selected'
              : 'filter__link'
          }
          data-cy="FilterLinkCompleted"
          onClick={() => onFilterChange(FilterType.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
