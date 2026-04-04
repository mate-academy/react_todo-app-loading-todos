import React from 'react';
import { Filter } from '../types/Filter';

type Props = {
  currentFilter: Filter;
  setFilter: (f: Filter) => void;
};

export const Footer: React.FC<Props> = ({ currentFilter, setFilter }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          data-cy="FilterLinkAll"
          className={`filter__link ${
            currentFilter === Filter.All ? 'selected' : ''
          }`}
          onClick={() => setFilter(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          data-cy="FilterLinkActive"
          className={`filter__link ${
            currentFilter === Filter.Active ? 'selected' : ''
          }`}
          onClick={() => setFilter(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          data-cy="FilterLinkCompleted"
          className={`filter__link ${
            currentFilter === Filter.Completed ? 'selected' : ''
          }`}
          onClick={() => setFilter(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        data-cy="ClearCompletedButton"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
