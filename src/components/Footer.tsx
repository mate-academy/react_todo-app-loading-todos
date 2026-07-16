import React from 'react';
import classNames from 'classnames';
import { FilterStatus } from '../types/FilterStatus';

type Props = {
  activeTodosCount: number;
  filter: FilterStatus;
  hasCompleted: boolean;
  onFilterChange: (filter: FilterStatus) => void;
  onClearCompleted: () => void;
};

type FilterLink = {
  status: FilterStatus;
  label: string;
  cy: string;
};

const filterLinks: FilterLink[] = [
  { status: FilterStatus.All, label: 'All', cy: 'FilterLinkAll' },
  { status: FilterStatus.Active, label: 'Active', cy: 'FilterLinkActive' },
  {
    status: FilterStatus.Completed,
    label: 'Completed',
    cy: 'FilterLinkCompleted',
  },
];

export const Footer: React.FC<Props> = ({
  activeTodosCount,
  filter,
  hasCompleted,
  onFilterChange,
  onClearCompleted,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filterLinks.map(link => (
          <a
            key={link.status}
            href={`#/${link.status === FilterStatus.All ? '' : link.status}`}
            className={classNames('filter__link', {
              selected: filter === link.status,
            })}
            data-cy={link.cy}
            onClick={() => onFilterChange(link.status)}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
