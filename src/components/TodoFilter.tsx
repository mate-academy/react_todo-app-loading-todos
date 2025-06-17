import React from 'react';
import { FilterType } from '../types/FilterType';

interface Props {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const TodoFilter: React.FC<Props> = ({ filter, onFilterChange }) => (
  <nav className="filter" data-cy="Filter">
    <a
      href="#/"
      className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
      data-cy="FilterLinkAll"
      onClick={e => {
        e.preventDefault();
        onFilterChange('all');
      }}
    >
      All
    </a>

    <a
      href="#/active"
      className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
      data-cy="FilterLinkActive"
      onClick={e => {
        e.preventDefault();
        onFilterChange('active');
      }}
    >
      Active
    </a>

    <a
      href="#/completed"
      className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
      data-cy="FilterLinkCompleted"
      onClick={e => {
        e.preventDefault();
        onFilterChange('completed');
      }}
    >
      Completed
    </a>
  </nav>
);
