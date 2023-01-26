import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { Filter } from '../types/Filter';

const { all, active, completed } = Filter;

type Props = {
  typeFilter: string;
  setTypeFilter: Dispatch<SetStateAction<Filter>>;
  itemsLeftCount: number;
};

export const Footer: React.FC<Props> = ({
  typeFilter,
  setTypeFilter,
  itemsLeftCount,
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
            selected: typeFilter === all,
          })}
          onClick={() => setTypeFilter(all)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link', {
            selected: typeFilter === active,
          })}
          onClick={() => setTypeFilter(active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link', {
            selected: typeFilter === completed,
          })}
          onClick={() => setTypeFilter(completed)}
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
