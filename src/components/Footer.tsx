// components/Footer.tsx
import React from 'react';
import classNames from 'classnames';
import { FilterType } from '../types/FilterType';

type Props = {
  filter: FilterType;
  todosCounter: number;
  onFilterChange: (filter: FilterType) => void;
};

const FILTER_LABELS: Record<FilterType, string> = {
  [FilterType.All]: 'All',
  [FilterType.Active]: 'Active',
  [FilterType.Completed]: 'Completed',
};

export const Footer: React.FC<Props> = ({
  filter,
  todosCounter,
  onFilterChange,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosCounter} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterType).map(type => (
          <a
            key={type}
            href={`#/${type === FilterType.All ? '' : type}`}
            className={classNames('filter__link', {
              selected: filter === type,
            })}
            data-cy={`FilterLink${FILTER_LABELS[type]}`}
            onClick={() => onFilterChange(type)}
          >
            {FILTER_LABELS[type]}
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
