/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import cn from 'classnames';
import { CompletedStatus } from '../types/CompletedStatus';

type Props = {
  itemsLeft: number;
  filterByStatus: CompletedStatus;
  onFilterByStatus: (status: CompletedStatus) => void;
};

export const TodoFooter: React.FC<Props> = ({
  itemsLeft,
  filterByStatus,
  onFilterByStatus,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {`${itemsLeft} items left`}
    </span>

    {/* Active link should have the 'selected' class */}
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={cn('filter__link', {
          selected: filterByStatus === CompletedStatus.All,
        })}
        data-cy="FilterLinkAll"
        onClick={() => onFilterByStatus(CompletedStatus.All)}
      >
        {CompletedStatus.All}
      </a>

      <a
        href="#/active"
        className={cn('filter__link', {
          selected: filterByStatus === CompletedStatus.Active,
        })}
        data-cy="FilterLinkActive"
        onClick={() => onFilterByStatus(CompletedStatus.Active)}
      >
        {CompletedStatus.Active}
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: filterByStatus === CompletedStatus.Completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => onFilterByStatus(CompletedStatus.Completed)}
      >
        {CompletedStatus.Completed}
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
