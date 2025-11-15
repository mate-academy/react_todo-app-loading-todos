import React from 'react';
import { FILTERS, FilterType } from '../constants/filters';

interface TodoFooterProps {
  activeTodosCount: number;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  hasCompletedTodos: boolean;
}

export const TodoFooter: React.FC<TodoFooterProps> = ({
  activeTodosCount,
  filter,
  setFilter,
  hasCompletedTodos,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {`${activeTodosCount} item${activeTodosCount !== 1 ? 's' : ''} left`}
    </span>

    {/* Active link should have the 'selected' class */}
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={`filter__link ${filter === FILTERS.ALL ? 'selected' : ''}`}
        onClick={() => setFilter(FILTERS.ALL)}
        data-cy="FilterLinkAll"
      >
        All
      </a>

      <a
        href="#/active"
        className={`filter__link ${filter === FILTERS.ACTIVE ? 'selected' : ''}`}
        onClick={() => setFilter(FILTERS.ACTIVE)}
        data-cy="FilterLinkActive"
      >
        Active
      </a>

      <a
        href="#/completed"
        className={`filter__link ${filter === FILTERS.COMPLETED ? 'selected' : ''}`}
        onClick={() => setFilter(FILTERS.COMPLETED)}
        data-cy="FilterLinkCompleted"
      >
        Completed
      </a>
    </nav>

    {/* this button should be disabled if there are no completed todos */}
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={!hasCompletedTodos}
    >
      Clear completed
    </button>
  </footer>
);
