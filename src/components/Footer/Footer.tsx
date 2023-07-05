import React from 'react';
import cn from 'classnames';
import { FilterBy } from '../../types/FilterBy';

type Props = {
  setFilterTodos: (status: FilterBy) => void;
  filterTodos: FilterBy;
  activeNumber: number;
  completedNumber: number;
};

export const Footer: React.FC<Props> = ({
  setFilterTodos,
  filterTodos,
  activeNumber,
  completedNumber,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeNumber} items left`}
      </span>

      <nav className="filter">
        {Object.entries(FilterBy).map(([key, value]) => (
          <a
            key={key}
            href={`#${value}`}
            className={cn('filter__link',
              { selected: filterTodos === value })}
            onClick={() => setFilterTodos(value)}
          >
            {key}
          </a>
        ))}
      </nav>

      {completedNumber > 0
        && (
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        )}
    </footer>
  );
};
