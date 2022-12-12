import classNames from 'classnames';
import React from 'react';
import { FilterValues } from '../types/FilterValues';

type Props = {
  activeTodosCount: number,
  filter: FilterValues
  setFilter: (filter: FilterValues) => void,
};

export const Footer: React.FC<Props> = React.memo(
  ({ activeTodosCount, filter, setFilter }) => {
    return (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${activeTodosCount} items left`}
        </span>

        <nav className="filter" data-cy="Filter">
          <a
            data-cy="FilterLinkAll"
            href="#/"
            className={classNames('filter__link', {
              selected: filter === FilterValues.ALL,
            })}
            onClick={() => setFilter(FilterValues.ALL)}
          >
            All
          </a>

          <a
            data-cy="FilterLinkActive"
            href="#/active"
            className={classNames('filter__link', {
              selected: filter === FilterValues.ACTIVE,
            })}
            onClick={() => setFilter(FilterValues.ACTIVE)}
          >
            Active
          </a>
          <a
            data-cy="FilterLinkCompleted"
            href="#/completed"
            className={classNames('filter__link', {
              selected: filter === FilterValues.COMPLETED,
            })}
            onClick={() => setFilter(FilterValues.COMPLETED)}
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
  },
);
