import classNames from 'classnames';
import React from 'react';
import { FilterMethods } from '../types/filterMethods';

type Props = {
  filterMethod: FilterMethods;
  setFilterMethod: (status: FilterMethods) => void;
  todosLeft: number;
};

export const Footer:React.FC<Props> = ({
  filterMethod,
  setFilterMethod,
  todosLeft,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="todosCounter">
      {`${todosLeft} items left`}
    </span>

    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={classNames(
          'filter__link',
          {
            selected: filterMethod === FilterMethods.ALL,
          },
        )}
        onClick={() => setFilterMethod(FilterMethods.ALL)}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className={classNames(
          'filter__link',
          {
            selected: filterMethod === FilterMethods.ACTIVE,
          },
        )}
        onClick={() => setFilterMethod(FilterMethods.ACTIVE)}
      >
        Active
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className={classNames(
          'filter__link',
          {
            selected: filterMethod === FilterMethods.COMPLETED,
          },
        )}
        onClick={() => setFilterMethod(FilterMethods.COMPLETED)}
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
