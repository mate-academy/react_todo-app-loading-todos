import React from 'react';
import cn from 'classnames';
import { Status } from '../types/Todo';

type Props = {
  activeTodosCount: number;
  hasCompletedTodos: boolean;
  statusFilter: Status;
  onStatusFilterChange: (filter: Status) => void;
  onClearCompleted: () => void;
};

export const Footer: React.FC<Props> = ({
  activeTodosCount,
  hasCompletedTodos,
  statusFilter,
  onStatusFilterChange,
  onClearCompleted,
}) => {
  const getHref = (filter: Status) => {
    switch (filter) {
      case Status.All:
        return '#/';
      case Status.Active:
        return '#/active';
      case Status.Completed:
        return '#/completed';
      default:
        return '#/';
    }
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Status).map(filter => (
          <a
            key={filter}
            href={getHref(filter)}
            className={cn('filter__link', {
              selected: statusFilter === filter,
            })}
            data-cy={`FilterLink${filter}`}
            onClick={e => {
              e.preventDefault();
              onStatusFilterChange(filter);
            }}
          >
            {filter.charAt(0) + filter.slice(1).toLowerCase()}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
