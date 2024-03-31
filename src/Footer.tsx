import React from 'react';
import { FilterBy } from './types/FilterBy';
import cn from 'classnames';

interface Props {
  onFilterClick: (value: FilterBy) => void;
  activeTodosCount: number;
  onClearCompleted: () => void;
  selectedFilterBy: FilterBy;
}

export const Footer: React.FC<Props> = ({
  onFilterClick,
  activeTodosCount,
  onClearCompleted,
  selectedFilterBy,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeTodosCount} items left
    </span>

    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={cn('filter__link', {
          selected: selectedFilterBy === FilterBy.All,
        })}
        data-cy="FilterLinkAll"
        onClick={() => onFilterClick(FilterBy.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', {
          selected: selectedFilterBy === FilterBy.Active,
        })}
        data-cy="FilterLinkActive"
        onClick={() => onFilterClick(FilterBy.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: selectedFilterBy === FilterBy.Completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => onFilterClick(FilterBy.Completed)}
      >
        Completed
      </a>
    </nav>

    {/* this button should be disabled if there are no completed todos */}
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      onClick={onClearCompleted}
    >
      Clear completed
    </button>
  </footer>
);