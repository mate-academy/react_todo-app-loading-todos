import React from 'react';
import cn from 'classnames';

type Props = {
  onStatusFilterChange: (state: string) => void;
  statusFilter: string;
  uncompletedAmount: number;
};

export const Footer: React.FC<Props> = ({
  onStatusFilterChange,
  statusFilter,
  uncompletedAmount,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedAmount} item${uncompletedAmount > 1 ? 's' : ''}`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={cn('filter__link', { selected: statusFilter === 'All' })}
          onClick={() => onStatusFilterChange('All')}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={cn('filter__link',
            { selected: statusFilter === 'Active' })}
          onClick={() => onStatusFilterChange('Active')}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={cn('filter__link',
            { selected: statusFilter === 'Completed' })}
          onClick={() => onStatusFilterChange('Completed')}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
