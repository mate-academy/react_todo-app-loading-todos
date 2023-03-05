import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';
import { Status } from '../../types/Status';

type Props = {
  completedCount: number,
  status: Status,
  setStatus: Dispatch<SetStateAction<Status>>,
};

export const Footer: React.FC<Props> = ({
  completedCount,
  status,
  setStatus,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${completedCount} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: status === Status.All },
          )}
          onClick={() => setStatus(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: status === Status.ACTIVE },
          )}
          onClick={() => setStatus(Status.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: status === Status.COMPLETED },
          )}
          onClick={() => setStatus(Status.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
