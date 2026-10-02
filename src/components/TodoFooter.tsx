import React from 'react';
import cn from 'classnames';
import { FilterType } from '../types/FilterType';

type Props = {
  activeCount: number;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

export const TodoFooter: React.FC<Props> = ({
  activeCount,
  filter,
  onFilterChange,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filter === 'all' })}
          data-cy="FilterLinkAll"
          onClick={event => {
            event.preventDefault();
            onFilterChange(FilterType.all);
          }}
        >
          All
        </a>
        <a
          href="#/active"
          className={cn('filter__link', { selected: filter === 'active' })}
          data-cy="FilterLinkActive"
          onClick={() => onFilterChange(FilterType.active)}
        >
          Active
        </a>
        <a
          href="#/completed"
          className={cn('filter__link', { selected: filter === 'completed' })}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilterChange(FilterType.completed)}
        >
          Completed
        </a>
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
