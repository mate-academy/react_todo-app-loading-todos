import React from 'react';

enum FilterType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

interface FooterProps {
  uncompletedCount: number;
  currentFilter: FilterType;
  setCurrentFilter: (filter: FilterType) => void;
  allTodosAreActive: boolean;
  clearCompleted: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  uncompletedCount,
  currentFilter,
  setCurrentFilter,
  allTodosAreActive,
  clearCompleted,
}) => {
  const handleFilterChange = (filter: FilterType) => {
    setCurrentFilter(filter);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {uncompletedCount}
        {' '}
        {uncompletedCount === 1 ? 'item' : 'items'}
        {' '}
        left
      </span>
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${
            currentFilter === FilterType.All ? 'selected' : ''
          }`}
          data-cy="FilterLinkAll"
          onClick={() => handleFilterChange(FilterType.All)}
        >
          All
        </a>
        <a
          href="#/active"
          className={`filter__link ${
            currentFilter === FilterType.Active ? 'selected' : ''
          }`}
          data-cy="FilterLinkActive"
          onClick={() => handleFilterChange(FilterType.Active)}
        >
          Active
        </a>
        <a
          href="#/completed"
          className={`filter__link ${
            currentFilter === FilterType.Completed ? 'selected' : ''
          }`}
          data-cy="FilterLinkCompleted"
          onClick={() => handleFilterChange(FilterType.Completed)}
        >
          Completed
        </a>
      </nav>
      {!allTodosAreActive && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
