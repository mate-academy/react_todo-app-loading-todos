import cn from 'classnames';
import { FilterState } from '../../types/FilterState';
import React, { Fragment } from 'react';

type Props = {
  activeTodosCount: number;
  completedTodosCount: number;
  activeFilter: FilterState;
  setActiveFilter: (state: FilterState) => void;
};

export const Footer: React.FC<Props> = ({
  activeTodosCount,
  completedTodosCount,
  activeFilter,
  setActiveFilter,
}) => {
  const filterValues = Object.values(FilterState);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filterValues.map(filterValue => (
          <Fragment key={filterValue}>
            <a
              href="#/"
              className={cn('filter__link', {
                selected: activeFilter === filterValue,
              })}
              data-cy={`FilterLink${filterValue}`}
              onClick={() => setActiveFilter(filterValue)}
            >
              {filterValue}
            </a>
          </Fragment>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedTodosCount}
      >
        Clear completed
      </button>
    </footer>
  );
};
