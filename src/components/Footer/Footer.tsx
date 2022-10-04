import React from 'react';
import classNames from 'classnames';

type Props = {
  filterBy: string,
  setFilterBy: (value: string) => void,
  allActiveTodos: number,
};

export const Footer: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  allActiveTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${allActiveTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="./Footer#/"
          className={classNames(
            'filter__link',
            { selected: filterBy === 'all' },
          )}
          onClick={() => setFilterBy('all')}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="./Footer#/active"
          className={classNames(
            'filter__link',
            { selected: filterBy === 'active' },
          )}
          onClick={() => setFilterBy('active')}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="./Footer#/completed"
          className={classNames(
            'filter__link',
            { selected: filterBy === 'completed' },
          )}
          onClick={() => setFilterBy('completed')}
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
};
