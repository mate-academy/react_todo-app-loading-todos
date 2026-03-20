import React, { Dispatch, SetStateAction } from 'react';
import { Filter } from '../types/common';

type Props = {
  activeCount: number;
  completedCount: number;
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  handleClearCompleted: () => void;
};

const filters = [
  { label: 'All', value: Filter.All, href: '#/', dataCy: 'FilterLinkAll' },
  {
    label: 'Active',
    value: Filter.Active,
    href: '#/active',
    dataCy: 'FilterLinkActive',
  },
  {
    label: 'Completed',
    value: Filter.Completed,
    href: '#/completed',
    dataCy: 'FilterLinkCompleted',
  },
];

export const Footer: React.FC<Props> = ({
  activeCount,
  completedCount,
  filter,
  setFilter,
  handleClearCompleted,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map(f => (
          <a
            key={f.value}
            href={f.href}
            data-cy={f.dataCy}
            className={`filter__link ${filter === f.value ? 'selected' : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedCount === 0}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
