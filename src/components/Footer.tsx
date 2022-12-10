import classNames from 'classnames';
import React from 'react';

type Props = {
  activeTodosCount: number,
  filter: string
  setFilter: (filter: string) => void,
};

export const Footer: React.FC<Props> = React.memo(
  ({ activeTodosCount, filter, setFilter }) => {
    return (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${activeTodosCount} items left`}
        </span>

        <nav className="filter" data-cy="Filter">
          <a
            data-cy="FilterLinkAll"
            href="#/"
            className={classNames('filter__link', {
              selected: filter === 'all',
            })}
            onClick={() => setFilter('all')}
          >
            All
          </a>

          <a
            data-cy="FilterLinkActive"
            href="#/active"
            className={classNames('filter__link', {
              selected: filter === 'active',
            })}
            onClick={() => setFilter('active')}
          >
            Active
          </a>
          <a
            data-cy="FilterLinkCompleted"
            href="#/completed"
            className={classNames('filter__link', {
              selected: filter === 'completed',
            })}
            onClick={() => setFilter('completed')}
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
    );
  },
);
