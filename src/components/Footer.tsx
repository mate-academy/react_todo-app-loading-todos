import React from 'react';
import { Filter } from '../types/Filter';

interface Props {
  activeCount: number;
  hasCompleted: boolean;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  onClearCompleted: () => void;
}

export const Footer: React.FC<Props> = ({
  activeCount,
  hasCompleted,
  filter,
  setFilter,
  onClearCompleted,
}) => {
  const itemText = activeCount === 1 ? 'item' : 'items';

  const filterOptions = [
    { type: Filter.ALL, href: '#/', label: 'All', cy: 'FilterLinkAll' },
    {
      type: Filter.ACTIVE,
      href: '#/active',
      label: 'Active',
      cy: 'FilterLinkActive',
    },
    {
      type: Filter.COMPLETED,
      href: '#/completed',
      label: 'Completed',
      cy: 'FilterLinkCompleted',
    },
  ];

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeCount} ${itemText} left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filterOptions.map(({ type, href, label, cy }) => (
          <a
            key={type}
            href={href}
            className={`filter__link ${filter === type ? 'selected' : ''}`}
            data-cy={cy}
            onClick={() => setFilter(type)}
          >
            {label}
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