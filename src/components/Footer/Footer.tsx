import React, { memo } from 'react';
import cn from 'classnames';

export enum Filters {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

type FooterProps = {
  filter: Filters,
  activeTodos: number,
  onChange: (arg: Filters) => void
};

export const Footer: React.FC<FooterProps> = memo(({
  filter,
  activeTodos,
  onChange,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="todosCounter">
      {`${activeTodos} items left`}
    </span>

    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        // className="filter__link selected"
        className={cn(
          'filter__link', {
            selected: filter === Filters.all,
          },
        )}
        onClick={() => onChange(Filters.all)}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        // className="filter__link"
        className={cn(
          'filter__link', {
            selected: filter === Filters.active,
          },
        )}
      >
        Active
      </a>

      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        // className="filter__link"
        className={cn(
          'filter__link', {
            selected: filter === Filters.completed,
          },
        )}
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
