import React, { memo } from 'react';

enum Filters {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

type FooterProps = {
  filter: Filters,
  activeTodos: number,
  onChange: void
};

export const Footer: React.FC<FooterProps> = memo(({
  filter,
  activeTodos,
  onChange,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="todosCounter">
      4 items left
    </span>

    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className="filter__link selected"
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className="filter__link"
      >
        Active
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className="filter__link"
      >
        Completed
      </a>
    </nav>

    <button
      data-cy="ClearCompletedButton"
      type="button"
      className="todoapp__clear-completed"
    >
      Clear completed
    </button>
  </footer>
));
