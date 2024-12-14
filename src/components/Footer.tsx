import React from 'react';
import { Status } from '../types/Status';
import cn from 'classnames';

interface Props {
  filteredStatus: Status;
  onFilteredStatus: (status: Status) => void;
  todosCount: number;
}

export const Footer: React.FC<Props> = ({
  filteredStatus,
  onFilteredStatus,
  todosCount,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          // className="filter__link selected"
          className={cn('filter__link', {
            selected: filteredStatus === Status.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onFilteredStatus(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filteredStatus === Status.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => onFilteredStatus(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filteredStatus === Status.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilteredStatus(Status.Completed)}
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
};
