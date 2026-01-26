import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  todos: Todo[];
  filter: FilterStatus;
  onFilterChange: (value: FilterStatus) => void;
  onClearCompleted: () => void;
};

export const TodoButtons: React.FC<Props> = ({
  todos,
  filter,
  onFilterChange,
  onClearCompleted,
}) => {
  if (todos.length === 0) {
    return null;
  }

  const activeCount = todos.filter(
    todo => todo.id !== 0 && !todo.completed,
  ).length;

  const hasCompleted = todos.some(todo => todo.completed);

  const filterLinks = [
    {
      label: 'All',
      href: '#/',
      value: FilterStatus.ALL,
      dataCy: 'FilterLinkAll',
    },
    {
      label: 'Active',
      href: '#/active',
      value: FilterStatus.ACTIVE,
      dataCy: 'FilterLinkActive',
    },
    {
      label: 'Completed',
      href: '#/completed',
      value: FilterStatus.COMPLETED,
      dataCy: 'FilterLinkCompleted',
    },
  ];

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filterLinks.map(({ label, href, value, dataCy }) => (
          <a
            key={value}
            href={href}
            className={classNames('filter__link', {
              selected: filter === value,
            })}
            data-cy={dataCy}
            onClick={() => onFilterChange(value)}
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={onClearCompleted}
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
