/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import classNames from 'classnames';
import { StatusFilter } from '../types/StatusFilter';

type Props = {
  filter: StatusFilter;
  setFilter: (value: StatusFilter) => void;
  activeCount: number;
};

const FILTER_LINKS: Record<
  StatusFilter,
  { label: string; href: string; cy: string }
> = {
  [StatusFilter.All]: { label: 'All', href: '#/', cy: 'FilterLinkAll' },
  [StatusFilter.Active]: {
    label: 'Active',
    href: '#/active',
    cy: 'FilterLinkActive',
  },
  [StatusFilter.Completed]: {
    label: 'Completed',
    href: '#/completed',
    cy: 'FilterLinkCompleted',
  },
};

export const Footer: React.FC<Props> = ({ filter, setFilter, activeCount }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(StatusFilter).map(status => (
          <a
            key={status}
            href={FILTER_LINKS[status].href}
            className={classNames('filter__link', {
              selected: filter === status,
            })}
            data-cy={FILTER_LINKS[status].cy}
            onClick={() => {
              setFilter(status);
            }}
          >
            {FILTER_LINKS[status].label}
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
