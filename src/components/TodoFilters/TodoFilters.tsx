import React from 'react';
import cn from 'classnames';
import { Filters } from '../../types';

interface Props {
  selectedFilter: Filters;
  todosLeft: number;
  onChangeFilter: (fil: Filters) => void;
}

export const TodoFilters: React.FC<Props> = ({
  selectedFilter,
  todosLeft,
  onChangeFilter,
}) => {
  const allFilters = [Filters.All, Filters.Active, Filters.Completed];

  return (
    <>
      {/* Hide the footer if there are no todos */}
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {todosLeft} items left
        </span>

        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          {allFilters.map(filter => (
            <a
              key={filter}
              href={`#/${filter !== Filters.All ? filter.toLowerCase() : ''}`}
              className={cn('filter__link', {
                selected: filter === selectedFilter,
              })}
              data-cy={`FilterLink${filter}`}
              onClick={() => onChangeFilter(filter)}
            >
              {filter}
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
    </>
  );
};
