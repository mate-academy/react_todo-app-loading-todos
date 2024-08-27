import React from 'react';
import { TodoFilter } from '../../types/filter';
import classNames from 'classnames';

type Props = {
  sortFilter: TodoFilter;
  setSortFilter: (value: TodoFilter) => void;
  activeCounter: number;
  notActiveCounter: number;
};

export const Footer: React.FC<Props> = ({
  sortFilter,
  setSortFilter,
  activeCounter,
  notActiveCounter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCounter} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: sortFilter === TodoFilter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => {
            setSortFilter(TodoFilter.All);
          }}
        >
          {TodoFilter.All}
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: sortFilter === TodoFilter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => {
            setSortFilter(TodoFilter.Active);
          }}
        >
          {TodoFilter.Active}
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: sortFilter === TodoFilter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            setSortFilter(TodoFilter.Completed);
          }}
        >
          {TodoFilter.Completed}
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={notActiveCounter === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
