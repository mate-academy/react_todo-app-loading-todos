import React from 'react';
import { FilteredStatus } from '../types/Todo';

interface Props {
  count: number;
  filterValue: FilteredStatus;
  setFilterValue: React.Dispatch<React.SetStateAction<FilteredStatus>>;
}

export const Footer = ({ count, filterValue, setFilterValue }: Props) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {count} items left
    </span>

    {/* Active link should have the 'selected' class */}
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={`filter__link ${filterValue === FilteredStatus.ALL ? 'selected' : ''}`}
        data-cy="FilterLinkAll"
        onClick={() => setFilterValue(FilteredStatus.ALL)}
      >
        All
      </a>

      <a
        href="#/active"
        className={`filter__link ${filterValue === FilteredStatus.ACTIVE ? 'selected' : ''}`}
        data-cy="FilterLinkActive"
        onClick={() => setFilterValue(FilteredStatus.ACTIVE)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={`filter__link ${filterValue === FilteredStatus.COMPLETED ? 'selected' : ''}`}
        data-cy="FilterLinkCompleted"
        onClick={() => setFilterValue(FilteredStatus.COMPLETED)}
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
