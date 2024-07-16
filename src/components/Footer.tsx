import React from 'react';
import { FilterType } from '../types/FilterType';
import classNames from 'classnames';

type FooterProps = {
  handleSetQuery: (FilterType: FilterType) => void;
  query: FilterType;
  left: () => number;
};

export const Footer = ({ handleSetQuery, query, left }: FooterProps) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {left()} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: query === FilterType.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleSetQuery(FilterType.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: query === FilterType.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleSetQuery(FilterType.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: query === FilterType.Complited,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleSetQuery(FilterType.Complited)}
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
