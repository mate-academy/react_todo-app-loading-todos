import classNames from 'classnames';
import React from 'react';
import { FilterType } from '../types/FilterType';

type Props = {
  filtered: string;
  onFiltered: (v: string) => void;
  activeTodos: number;
};

export const Footer: React.FC<Props> = ({
  filtered,
  onFiltered,
  activeTodos,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeTodos} items left
    </span>

    {/* Active link should have the 'selected' class */}
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filtered === FilterType.All,
        })}
        data-cy="FilterLinkAll"
        onClick={() => onFiltered(FilterType.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filtered === FilterType.Active,
        })}
        data-cy="FilterLinkActive"
        onClick={() => onFiltered(FilterType.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filtered === FilterType.Completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => onFiltered(FilterType.Completed)}
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
