import classNames from 'classnames';
import React from 'react';
import { Status } from '../types/Status';

interface FooterProps {
  filter: Status;
  setFilter: (filter: Status) => void;
  activeCount: number;
}

export const Footer: React.FC<FooterProps> = ({
  filter,
  setFilter,
  activeCount,
}) => {
  const itemCountText = `${activeCount} ${activeCount === 1 ? 'item' : 'items'} left`;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemCountText}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === Status.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(Status.ALL)}
        >
          All
        </a>
        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === Status.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(Status.ACTIVE)}
        >
          Active
        </a>
        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === Status.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(Status.COMPLETED)}
        >
          Completed
        </a>
      </nav>

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
