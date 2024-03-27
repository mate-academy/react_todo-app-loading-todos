import classNames from 'classnames';
import React from 'react';

type Props = {
  value: string;
  itemsLeft: number;
  onFilter: (value: string) => void;
};

export const Footer: React.FC<Props> = ({ value, itemsLeft, onFilter }) => {
  return (
    // {/* Hide the footer if there are no todos */}
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeft} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', { selected: value === 'all' })}
          data-cy="FilterLinkAll"
          onClick={() => {
            onFilter('all');
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: value === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => {
            onFilter('active');
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: value === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            onFilter('completed');
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
