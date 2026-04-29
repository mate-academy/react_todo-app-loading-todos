import React from 'react';
import classNames from 'classnames';

type Status = 'all' | 'active' | 'completed';

type Props = {
  activeCount: number;
  status: Status;
  setStatus: (value: Status) => void;
  completedExists: boolean;
  onClear: () => void;
};

export const Footer: React.FC<Props> = ({
  activeCount,
  status,
  setStatus,
  completedExists,
  onClear,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span data-cy="TodosCounter">{activeCount} items left</span>

    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        className={classNames('filter__link', {
          selected: status === 'all',
        })}
        onClick={() => setStatus('all')}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        className={classNames('filter__link', {
          selected: status === 'active',
        })}
        onClick={() => setStatus('active')}
      >
        Active
      </a>

      <a
        data-cy="FilterLinkCompleted"
        className={classNames('filter__link', {
          selected: status === 'completed',
        })}
        onClick={() => setStatus('completed')}
      >
        Completed
      </a>
    </nav>

    {completedExists && (
      <button data-cy="ClearCompletedButton" onClick={onClear}>
        Clear completed
      </button>
    )}
  </footer>
);
