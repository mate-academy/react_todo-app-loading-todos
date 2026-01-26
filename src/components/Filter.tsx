import React from 'react';
import { Filters } from '../types/Filters';

type Props = {
  filterField: Filters;
  onChangeFilter: (filterBy: Filters) => void;
  activeItemsCount: number;
};

export const Filter: React.FC<Props> = ({
  filterField,
  onChangeFilter,
  activeItemsCount,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeItemsCount} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filterField === 'all' ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => onChangeFilter(Filters.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filterField === 'active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => onChangeFilter(Filters.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filterField === 'completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => onChangeFilter(Filters.Completed)}
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
