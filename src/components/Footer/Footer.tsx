import React from 'react';
import { FilterOptions } from '../../types/FilterOptions';
import cn from 'classnames';

type Props = {
  activeTodosCount: number;
  todosFilter: FilterOptions;
  setTodosFilter: (filterState: FilterOptions) => void;
};

export const Footer: React.FC<Props> = ({
  activeTodosCount,
  todosFilter,
  setTodosFilter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosCount} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(FilterOptions).map(option => {
          return (
            <a
              href={`#/${option}`}
              className={cn('filter__link', {
                selected: option === todosFilter,
              })}
              data-cy={`FilterLink${option}`}
              key={option}
              onClick={() => setTodosFilter(option)}
            >
              {option}
            </a>
          );
        })}

        {/* <a
          name="all"
          href="#/"
          className="filter__link"
          data-cy="FilterLinkAll"
          ref={selectedFilter}
          onClick={something}
        >
          All
        </a>

        <a
          name="active"
          href="#/active"
          className="filter__link"
          data-cy="FilterLinkActive"
          onClick={something}
        >
          Active
        </a>

        <a
          name="completed"
          href="#/completed"
          className="filter__link"
          data-cy="FilterLinkCompleted"
          onClick={something}
        >
          Completed
        </a> */}
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
