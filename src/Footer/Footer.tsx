// components/Footer.tsx
import React from 'react';

type FilterType = 'all' | 'active' | 'completed';

type Props = {
  filter: FilterType;
  onFilterChange: React.Dispatch<React.SetStateAction<FilterType>>;
  hasCompleted: boolean;
  onClearCompleted: () => void;
  visibleCount: number;
};

export const Footer: React.FC<Props> = ({
  filter,
  onFilterChange,
  hasCompleted,
  onClearCompleted,
  visibleCount,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {visibleCount} items left
    </span>

    <nav className="filter" data-cy="Filter" aria-label="Filter todos">
      <a
        href="#/"
        className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
        data-cy="FilterLinkAll"
        onClick={e => {
          e.preventDefault();
          onFilterChange('all');
        }}
      >
        All
      </a>

      <a
        href="#/active"
        className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
        data-cy="FilterLinkActive"
        onClick={e => {
          e.preventDefault();
          onFilterChange('active');
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
        data-cy="FilterLinkCompleted"
        onClick={e => {
          e.preventDefault();
          onFilterChange('completed');
        }}
      >
        Completed
      </a>
    </nav>

    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      onClick={onClearCompleted}
      disabled={!hasCompleted}
      aria-disabled={!hasCompleted}
    >
      Clear completed
    </button>
  </footer>
);
