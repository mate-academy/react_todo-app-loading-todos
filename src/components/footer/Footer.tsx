import React from 'react';
import { Completed } from '../../types/Filters';

type Props = {
  onSetParam: (val: Completed) => void;
  filterParam: Completed;
  count: number;
};

export const Footer: React.FC<Props> = ({ onSetParam, filterParam, count }) => {
  return (
    <>
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {count} items left
        </span>

        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={`filter__link ${filterParam === Completed.All && 'selected'}`}
            data-cy="FilterLinkAll"
            onClick={() => onSetParam(Completed.All)}
          >
            All
          </a>

          <a
            href="#/active"
            className={`filter__link ${filterParam === Completed.Active && 'selected'}`}
            data-cy="FilterLinkActive"
            onClick={() => onSetParam(Completed.Active)}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={`filter__link ${filterParam === Completed.Completed && 'selected'}`}
            data-cy="FilterLinkCompleted"
            onClick={() => onSetParam(Completed.Completed)}
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
    </>
  );
};
