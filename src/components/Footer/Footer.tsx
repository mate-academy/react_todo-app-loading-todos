import React from 'react';
import classNames from 'classnames';

// #Import
import { FilterStatus } from '../../App';

// #Props
interface FooterProps {
  uncompletedTodosCount: number;
  filterStatus: FilterStatus;
  setFilterStatus: (status: FilterStatus) => void;
}

export const Footer: React.FC<FooterProps> = ({
  uncompletedTodosCount,
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <footer className="todoapp__footer hidden" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {uncompletedTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterStatus).map(status => (
          <a
            key={status}
            href={`#/${status === FilterStatus.All ? '' : status}`}
            className={classNames('filter__link', {
              selected: filterStatus === status,
            })}
            data-cy={`FilterLink${status.charAt(0).toUpperCase() + status.slice(1)}`}
            onClick={() => setFilterStatus(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </a>
        ))}
      </nav>

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
