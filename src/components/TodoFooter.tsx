import React from 'react';
import classNames from 'classnames';
import { FilterStatus } from '../types/ui';

type Props = {
  hasTodos: boolean;
  activeTodosCount: number;
  completedTodosCount: number;
  selectedFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
};

const filterLinks = [
  {
    title: 'All',
    href: '#/',
    dataCy: 'FilterLinkAll',
    value: FilterStatus.All,
  },
  {
    title: 'Active',
    href: '#/active',
    dataCy: 'FilterLinkActive',
    value: FilterStatus.Active,
  },
  {
    title: 'Completed',
    href: '#/completed',
    dataCy: 'FilterLinkCompleted',
    value: FilterStatus.Completed,
  },
];

export const TodoFooter: React.FC<Props> = ({
  hasTodos,
  activeTodosCount,
  completedTodosCount,
  selectedFilter,
  onFilterChange,
}) => {
  if (!hasTodos) {
    return null;
  }

  return (
    <footer className="todoapp__footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosCount} item${activeTodosCount === 1 ? '' : 's'} left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filterLinks.map(link => (
          <a
            key={link.value}
            href={link.href}
            data-cy={link.dataCy}
            className={classNames('filter__link', {
              selected: selectedFilter === link.value,
            })}
            onClick={event => {
              event.preventDefault();
              onFilterChange(link.value);
            }}
          >
            {link.title}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodosCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
