import React from 'react';
import cn from 'classnames';

import { Filter, FILTER_LINKS } from '../types/Filter';

interface TodoFooterProps {
  setFilterBy: React.Dispatch<React.SetStateAction<Filter>>;
  filterBy: Filter;
  activeTodosCount: number;
}

export const TodoFooter: React.FC<TodoFooterProps> = React.memo(
  ({ setFilterBy, filterBy, activeTodosCount }) => {
    return (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {activeTodosCount} items left
        </span>

        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          {FILTER_LINKS.map(filterLink => (
            <a
              key={filterLink}
              href={`#/${filterLink.toLowerCase()}`}
              className={cn('filter__link', {
                selected: filterLink === filterBy,
              })}
              data-cy={`FilterLink${filterLink}`}
              onClick={() => setFilterBy(filterLink)}
            >
              {filterLink}
            </a>
          ))}
        </nav>

        {/* this button should be disabled if there are no completed todos */}
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      </footer>
    );
  },
);

TodoFooter.displayName = 'TodoFooter';
