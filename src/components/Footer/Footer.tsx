import React from 'react';
import { FilterStatus } from '../../types/ui';

type Props = {
  countActive: number;
  todosLength: number;
  current: FilterStatus;
  setFilter: (f: FilterStatus) => void;
  hasCompleted: boolean;
};

export const Footer: React.FC<Props> = ({
  countActive,
  todosLength,
  current,
  setFilter,
  hasCompleted,
}) => {
  if (!todosLength) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countActive} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${current === FilterStatus.All ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(FilterStatus.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${current === FilterStatus.Active ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(FilterStatus.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${current === FilterStatus.Completed ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(FilterStatus.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
