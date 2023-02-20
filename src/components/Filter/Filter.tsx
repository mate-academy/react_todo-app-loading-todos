import React from 'react';
import cn from 'classnames';
import { FilterBy } from '../../types/FilterBy';

interface Props {
  filterBy: FilterBy,
  setFilterBy: (param: FilterBy) => void
}

export const Filter: React.FC<Props> = ({ filterBy, setFilterBy }) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={cn(
            'filter__link',
            { selected: filterBy === 'all' },
          )}
          onClick={() => setFilterBy(FilterBy.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn(
            'filter__link',
            { selected: filterBy === 'active' },
          )}
          onClick={() => setFilterBy(FilterBy.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn(
            'filter__link',
            { selected: filterBy === 'completed' },
          )}
          onClick={() => setFilterBy(FilterBy.completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
