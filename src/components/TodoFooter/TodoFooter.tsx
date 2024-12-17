import React from 'react';
import classNames from 'classnames';
import { StatusFilter } from '../../types/StatusFilter';

type Props = {
  statusFilter: StatusFilter;
  setStatusFilter: (status: StatusFilter) => void;
  countActiveTodos: number;
  hasCompletedTodos: boolean;
};

export const TodoFooter: React.FC<Props> = ({
  setStatusFilter,
  statusFilter,
  countActiveTodos,
  hasCompletedTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countActiveTodos} items left
      </span>
      <nav className="filter" data-cy="Filter">
        {Object.keys(StatusFilter).map(status => (
          <a
            href="#/"
            className={classNames('filter__link', {
              selected: statusFilter === status,
            })}
            data-cy={`FilterLink${status}`}
            key={status}
            onClick={() => setStatusFilter(status as StatusFilter)}
          >
            {status}
          </a>
        ))}

        {/* <a
          href="#/active"
          className={classNames('filter__link', {
            'selected': statusFilter === StatusFilter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setStatusFilter(StatusFilter.Active)}
        >
          Active
        </a> */}

        {/* <a
          href="#/completed"
          className={classNames('filter__link', {
            'selected': statusFilter === StatusFilter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setStatusFilter(StatusFilter.Completed)}
        >
          Completed
        </a> */}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
