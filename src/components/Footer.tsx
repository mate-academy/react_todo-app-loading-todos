import React from 'react';
import classNames from 'classnames';
import { FilterStatus } from '../types/FilterStatus';

type Props = {
  todosCount: number;
  completedTodosCount: number;
  filterStatus: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
};

export const Footer: React.FC<Props> = ({
  todosCount,
  completedTodosCount,
  filterStatus,
  onFilterChange,
}) => {
  const handleFilterClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    filter: FilterStatus,
  ) => {
    e.preventDefault();
    onFilterChange(filter);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosCount - completedTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterStatus).map(status => (
          <a
            key={status}
            href={`#/${status.toLowerCase()}`}
            className={classNames('filter__link', {
              selected: filterStatus === status,
            })}
            data-cy={`FilterLink${status}`}
            onClick={e => handleFilterClick(e, status)}
          >
            {status}
          </a>
        ))}
      </nav>

      {completedTodosCount > 0 && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
