import classNames from 'classnames';
import React from 'react';

interface Props {
  nrOfActiveTodos: number;
  filter: string;
  allSelected: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  activeSelected: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  completedSelected: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const Footer: React.FC<Props> = React.memo(
  ({
    nrOfActiveTodos,
    filter,
    allSelected,
    activeSelected,
    completedSelected,
  }) => {
    return (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {nrOfActiveTodos} items left
        </span>

        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={classNames('filter__link', {
              selected: filter === 'All',
            })}
            data-cy="FilterLinkAll"
            onClick={allSelected}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link', {
              selected: filter === 'Active',
            })}
            data-cy="FilterLinkActive"
            onClick={activeSelected}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link', {
              selected: filter === 'Completed',
            })}
            data-cy="FilterLinkCompleted"
            onClick={completedSelected}
          >
            Completed
          </a>
        </nav>

        {/* this button should be disabled if there are no completed todos */}
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      </footer>
    );
  },
);

Footer.displayName = 'Footer';
