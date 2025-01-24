import classNames from 'classnames';
import React from 'react';
interface Props {
  setFilter: (filter: string) => void;
  filter: string;
  listOfActiveTodos: number;
}

export const TodoFooter: React.FC<Props> = ({
  setFilter,
  filter,
  listOfActiveTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {listOfActiveTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === 'All',
          })}
          data-cy="FilterLinkAll"
          onClick={e => {
            e.preventDefault();
            setFilter('All');
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={e => {
            e.preventDefault();
            setFilter('Active');
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={e => {
            e.preventDefault();
            setFilter('Completed');
          }}
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
