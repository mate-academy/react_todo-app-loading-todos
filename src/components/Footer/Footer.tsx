import classNames from 'classnames';
import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  hasCompleted: boolean;
  activeCount: number;
  onFilterChange: (value: Filter) => void;
  filter: Filter;
};

export const Footer: React.FC<Props> = ({
  hasCompleted,
  activeCount,
  onFilterChange,
  filter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeCount} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.entries(Filter).map(([key, value]) => (
          <a
            data-cy={`FilterLink${key}`}
            href={`#/${value}`}
            className={classNames(
              'filter__link',
              { selected: value === filter },
            )}
            key={value}
            onClick={() => onFilterChange(value)}
          >
            {key}
          </a>
        ))}
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
