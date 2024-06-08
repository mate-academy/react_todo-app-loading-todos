import React from 'react';
import { Filter } from '../types/Filter';
import { FilterLink } from './FilterLink';

export const Footer: React.FC<{
  activeTodosCount: number;
  filter: Filter;
  handleSetFilter: (filter: Filter) => void;
}> = ({ activeTodosCount, filter, handleSetFilter }) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeTodosCount} items left
    </span>
    <nav className="filter" data-cy="Filter">
      <FilterLink
        filter="all"
        currentFilter={filter}
        setFilter={handleSetFilter}
        label="All"
        dataCy="FilterLinkAll"
      />
      <FilterLink
        filter="active"
        currentFilter={filter}
        setFilter={handleSetFilter}
        label="Active"
        dataCy="FilterLinkActive"
      />
      <FilterLink
        filter="completed"
        currentFilter={filter}
        setFilter={handleSetFilter}
        label="Completed"
        dataCy="FilterLinkCompleted"
      />
    </nav>
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
    >
      Clear completed
    </button>
  </footer>
);
