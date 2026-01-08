import React from 'react';
import { FilterStatus } from '../types/FilterStatus';

interface Props {
  activeCount: number;
  filter: FilterStatus;
  setFilter: (status: FilterStatus) => void;
  hasCompleted: boolean;
}

export const Footer: React.FC<Props> = ({
  activeCount,
  filter,
  setFilter,
  hasCompleted,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeCount} items left
    </span>

    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={`filter__link ${filter === FilterStatus.All ? 'selected' : ''}`}
        onClick={() => setFilter(FilterStatus.All)}
        data-cy="FilterLinkAll"
      >
        All
      </a>

      <a
        href="#/active"
        className={`filter__link ${filter === FilterStatus.Active ? 'selected' : ''}`}
        onClick={() => setFilter(FilterStatus.Active)}
        data-cy="FilterLinkActive"
      >
        Active
      </a>

      <a
        href="#/completed"
        className={`filter__link ${filter === FilterStatus.Completed ? 'selected' : ''}`}
        onClick={() => setFilter(FilterStatus.Completed)}
        data-cy="FilterLinkCompleted"
      >
        Completed
      </a>
    </nav>

    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={!hasCompleted}
    >
      Clear completed
    </button>
  </footer>
);
