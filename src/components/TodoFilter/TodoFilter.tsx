import React from 'react';
import { Filter } from '../../types/Filter';
import classNames from 'classnames';

type Props = {
  status: Filter;
  onSorted: (sortedField: Filter) => void;
};

export const TodoFilter: React.FC<Props> = ({ onSorted, status }) => (
  <>
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: status === Filter.ALL,
        })}
        data-cy="FilterLinkAll"
        onClick={() => onSorted(Filter.ALL)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: status === Filter.ACTIVE,
        })}
        data-cy="FilterLinkActive"
        onClick={() => onSorted(Filter.ACTIVE)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: status === Filter.COMPLETED,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => onSorted(Filter.COMPLETED)}
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
  </>
);
