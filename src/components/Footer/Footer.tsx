import cn from 'classnames';
import React, { MouseEvent } from 'react';
import { Filter } from '../../types/Filter';

interface FooterProps {
  activeCount: number;
  currentFilter: Filter;
  setCurrentFilter: (filter: Filter) => void;
}

export const Footer: React.FC<FooterProps> = ({
  activeCount,
  currentFilter,
  setCurrentFilter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeCount} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(filter => (
          <a
            key={filter}
            href={`#/${filter.toLowerCase()}`}
            className={cn('filter__link', {
              selected: currentFilter === filter,
            })}
            data-cy={`FilterLink${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
            onClick={(event: MouseEvent<HTMLAnchorElement>) => {
              event.preventDefault();
              setCurrentFilter(filter);
            }}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
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
