import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { FilterTypes } from '../types';

type Props = {
  typeFilter: string;
  setTypeFilter: Dispatch<SetStateAction<FilterTypes>>;
  completedTodosCount: number;
};

export const Footer: React.FC<Props> = ({
  typeFilter,
  setTypeFilter,
  completedTodosCount: itemsLeftCount,
}) => {
  return (
    <footer
      className="todoapp__footer"
      data-cy="Footer"
    >
      <span
        className="todo-count"
        data-cy="todosCounter"
      >
        {`${itemsLeftCount} items left`}
      </span>

      <nav
        className="filter"
        data-cy="Filter"
      >
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link', {
            selected: typeFilter === FilterTypes.All,
          })}
          onClick={() => setTypeFilter(FilterTypes.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link', {
            selected: typeFilter === FilterTypes.Active,
          })}
          onClick={() => setTypeFilter(FilterTypes.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link', {
            selected: typeFilter === FilterTypes.Completed,
          })}
          onClick={() => setTypeFilter(FilterTypes.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
