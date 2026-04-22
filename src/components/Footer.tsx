import React from 'react';
import { Status } from '../types/Enum';

interface Props {
  activeCount: number;
  currentFilter: Status;
  onFilterChange: (status: Status) => void;
  hasCompleted: boolean;
}

export const Footer: React.FC<Props> = ({
  activeCount,
  currentFilter,
  onFilterChange,
  hasCompleted,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeCount} items left
    </span>

    <nav className="filter" data-cy="Filter">
      {Object.values(Status).map(status => (
        <a
          key={status}
          href={`#/${status === Status.All ? '' : status}`}
          className={`filter__link ${currentFilter === status ? 'selected' : ''}`}
          data-cy={`FilterLink${status.charAt(0).toUpperCase() + status.slice(1)}`}
          onClick={() => onFilterChange(status)}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </a>
      ))}
    </nav>

    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={!hasCompleted}
    >
      Clear completed
    </button>
  </footer>
);
