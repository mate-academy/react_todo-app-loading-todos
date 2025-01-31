import React from 'react';
import { Filter } from '../types/Filter';
import cn from 'classnames';

interface Props {
  activeTodos: number;
  setFilter: (fil: Filter) => void;
  filter: Filter;
}

export const TodoFooter: React.FC<Props> = ({
  filter,
  setFilter,
  activeTodos,
}) => {
  const handleFilterChange = (newFilter: Filter) => () => {
    setFilter(newFilter);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filter === Filter.All })}
          data-cy="FilterLinkAll"
          onClick={handleFilterChange(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          data-cy="FilterLinkActive"
          className={cn('filter__link', { selected: filter === Filter.Active })}
          onClick={handleFilterChange(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          data-cy="FilterLinkCompleted"
          className={cn('filter__link', {
            selected: filter === Filter.Completed,
          })}
          onClick={handleFilterChange(Filter.Completed)}
        >
          Completed
        </a>
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
