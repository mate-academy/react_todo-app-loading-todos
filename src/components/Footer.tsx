import React from 'react';
import { FilterStatus } from '../types/FilterStatus';

type Props = {
  activeTodosCount: number;
  hasCompletedTodos: boolean;
  status: FilterStatus;
  onStatusChange: (status: FilterStatus) => void;
};

export const Footer: React.FC<Props> = ({
  activeTodosCount,
  hasCompletedTodos,
  status,
  onStatusChange,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeTodosCount} items left
    </span>

    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={`filter__link ${status === 'all' ? 'selected' : ''}`}
        data-cy="FilterLinkAll"
        onClick={() => onStatusChange('all')}
      >
        All
      </a>

      <a
        href="#/active"
        className={`filter__link ${status === 'active' ? 'selected' : ''}`}
        data-cy="FilterLinkActive"
        onClick={() => onStatusChange('active')}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={`filter__link ${status === 'completed' ? 'selected' : ''}`}
        data-cy="FilterLinkCompleted"
        onClick={() => onStatusChange('completed')}
      >
        Completed
      </a>
    </nav>

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
