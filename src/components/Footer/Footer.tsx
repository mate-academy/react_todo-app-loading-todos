import React from 'react';
import { Filter } from '../../types/Filter';
import classNames from 'classnames';

type Props = {
  filter: Filter;
  activeTodosCount: number;
  hasCompletedTodos: boolean;
  onFilterClick: (newFilter: Filter) => void;
};

export const Footer: React.FC<Props> = ({
  filter,
  activeTodosCount,
  hasCompletedTodos,
  onFilterClick,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {`${activeTodosCount} items left`}
    </span>

    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', { selected: filter === 'all' })}
        data-cy="FilterLinkAll"
        onClick={() => onFilterClick('all')}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filter === 'active',
        })}
        data-cy="FilterLinkActive"
        onClick={() => onFilterClick('active')}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filter === 'completed',
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => onFilterClick('completed')}
      >
        Completed
      </a>
    </nav>

    {hasCompletedTodos && (
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    )}
  </footer>
);
