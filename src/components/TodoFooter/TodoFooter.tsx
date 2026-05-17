import React from 'react';
import { Status, StatusMap } from '../../types/Status';
import cn from 'classnames';

type Props = {
  activeCount: number;
  completedCount: number;
  status: Status;
  onChangeFilterStatus: (status: Status) => void;
};

export const TodoFooter: React.FC<Props> = ({
  activeCount = 0,
  completedCount = 0,
  status,
  onChangeFilterStatus,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeCount} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: status === StatusMap.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onChangeFilterStatus(StatusMap.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: status === StatusMap.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => onChangeFilterStatus(StatusMap.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: status === StatusMap.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onChangeFilterStatus(StatusMap.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedCount < 1}
      >
        Clear completed
      </button>
    </footer>
  );
};
