import React from 'react';
import classNames from 'classnames';

import { Progress } from '../../types/Progress';

export const Footer: React.FC<{
  activeTodosAmount: number;
  filterField: Progress;
  handleFilterField: (status: Progress) => void;
}> = ({ activeTodosAmount, filterField, handleFilterField }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosAmount} items left`}
      </span>
      {/* Active link should have the 'selected' class */}

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterField === Progress.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleFilterField(Progress.All)}
        >
          {Progress.All}
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterField === Progress.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleFilterField(Progress.Active)}
        >
          {Progress.Active}
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterField === Progress.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleFilterField(Progress.Completed)}
        >
          {Progress.Completed}
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
