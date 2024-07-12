import React from 'react';
import { Filter } from '../../types/Filter';

interface Props {
  activeTodosCount: number;
  areThereCompletedTodos: boolean;
  filter: Filter;
  setFilter: (value: Filter) => void;
}

export const Footer: React.FC<Props> = ({
  activeTodosCount,
  areThereCompletedTodos,
  filter,
  setFilter,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeTodosCount} items left
    </span>

    {/* Active link should have the 'selected' class */}
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={`filter__link ${filter === 'all' && 'selected'}`}
        data-cy="FilterLinkAll"
        onClick={() => setFilter('all')}
      >
        All
      </a>

      <a
        href="#/active"
        className={`filter__link ${filter === 'active' && 'selected'}`}
        data-cy="FilterLinkActive"
        onClick={() => setFilter('active')}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={`filter__link ${filter === 'completed' && 'selected'}`}
        data-cy="FilterLinkCompleted"
        onClick={() => setFilter('completed')}
      >
        Completed
      </a>
    </nav>

    {/* this button should be disabled if there are no completed todos */}
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={!areThereCompletedTodos}
    >
      Clear completed
    </button>
  </footer>
);
