import React from 'react';
import classNames from 'classnames';
import { Status } from '../types/Status';

type Props = {
  itemsLeft: number,
  filterByStatus: string,
  setFilterByStatus: React.Dispatch<React.SetStateAction<Status>>,
};

export const TodoAppFooter: React.FC<Props> = ({
  itemsLeft,
  filterByStatus,
  setFilterByStatus,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filterByStatus === Status.All },
          )}
          onClick={() => setFilterByStatus(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filterByStatus === Status.Active },
          )}
          onClick={() => setFilterByStatus(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filterByStatus === Status.Completed },
          )}
          onClick={() => setFilterByStatus(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
