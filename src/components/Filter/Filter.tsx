import React from 'react';
import classNames from 'classnames';
import { Status } from '../../types/Status';

interface Props {
  currentStatus: Status;
  handleFilterAll: () => void;
  handleFilterActive: () => void;
  handleFilterCompleted: () => void;
}

export const Filter: React.FC<Props> = React.memo(({
  currentStatus,
  handleFilterAll,
  handleFilterActive,
  handleFilterCompleted,
}) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: currentStatus === Status.all,
        })}
        data-cy="FilterLinkAll"
        onClick={handleFilterAll}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: currentStatus === Status.active,
        })}
        data-cy="FilterLinkActive"
        onClick={handleFilterActive}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: currentStatus === Status.completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={handleFilterCompleted}
      >
        Completed
      </a>
    </nav>
  );
});
