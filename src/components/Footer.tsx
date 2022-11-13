import classNames from 'classnames';
import React from 'react';

type Props = {
  filterMethod: string;
  setFilterMethod: (value: string) => void,
};

export const Footer:React.FC<Props> = ({
  filterMethod,
  setFilterMethod,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="todosCounter">
      4 items left
    </span>

    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={classNames(
          'filter__link',
          {
            selected: filterMethod === 'all',
          },
        )}
        onClick={() => setFilterMethod('all')}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className={classNames(
          'filter__link',
          {
            selected: filterMethod === 'active',
          },
        )}
        onClick={() => setFilterMethod('active')}
      >
        Active
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className={classNames(
          'filter__link',
          {
            selected: filterMethod === 'completed',
          },
        )}
        onClick={() => setFilterMethod('completed')}
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
