import classNames from 'classnames';
import React from 'react';

type TodoFilter = 'all' | 'active' | 'completed';

interface Props {
  counterTitle: string;
  filterBy: TodoFilter;
  setFilter: (value: TodoFilter) => void;
  numActive: number;
  completed: boolean | undefined;
}

export const Footer: React.FC<Props> = ({
  counterTitle,
  filterBy,
  setFilter,
  numActive,
  completed,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {counterTitle}
    </span>

    {/* Active link should have the 'selected' class */}
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filterBy === 'all',
        })}
        data-cy="FilterLinkAll"
        onClick={() => setFilter('all')}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filterBy === 'active',
        })}
        data-cy="FilterLinkActive"
        onClick={() => setFilter('active')}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filterBy === 'completed',
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => setFilter('completed')}
      >
        Completed
      </a>
    </nav>

    {/*this button should be disabled if there are no completed todos*/}

    {numActive && (
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completed}
      >
        Clear completed
      </button>
    )}
  </footer>
);
