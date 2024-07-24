import { FC } from 'react';
import { FilterTupes } from '../types/Filters';
import React from 'react';
import cn from 'classnames';

interface Props {
  selectedFilter: FilterTupes;
  activeTodosCount: number;
  onFilter: (filter: FilterTupes) => void;
}

export const Footer: FC<Props> = ({
  selectedFilter,
  activeTodosCount,
  onFilter,
}) => {
  const filters = [FilterTupes.All, FilterTupes.Active, FilterTupes.Complete];

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filters.map(filter => (
          <a
            key={filter}
            href={`#${filter}`}
            className={cn('filter__link', {
              selected: filter === selectedFilter,
            })}
            data-cy={`FilterLink${filter}`}
            onClick={() => onFilter(filter)}
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
  );
};
