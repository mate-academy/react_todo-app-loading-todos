import React from 'react';
import cn from 'classnames';
import { FilterBy } from '../../types/FilterBy';

type Props = {
  quantity: number,
  filterBy: FilterBy,
  onFilterBy: (filter: FilterBy) => void,
  hasCompletedTodos: boolean,
};

export const Footer: React.FC<Props> = ({
  quantity,
  filterBy,
  onFilterBy,
  hasCompletedTodos,
}) => (
  <footer className="todoapp__footer">
    <span className="todo-count">
      {`${quantity} items left`}
    </span>

    {/* Active filter should have a 'selected' class */}
    <nav className="filter">
      {Object.values(FilterBy).map(filterType => (
        <a
          key={filterType}
          href="#/"
          className={cn('filter__link', {
            selected: filterBy === filterType,
          })}
          onClick={() => onFilterBy(filterType)}
        >
          {filterType}
        </a>
      ))}
    </nav>

    {/* don't show this button if there are no completed todos */}
    <button
      type="button"
      className="todoapp__clear-completed"
      disabled={!hasCompletedTodos}
    >
      Clear completed
    </button>
  </footer>
);
