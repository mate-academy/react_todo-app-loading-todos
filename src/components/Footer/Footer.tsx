import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  countItem: number;
};

export const Footer: React.FC<Props> = ({ countItem }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {countItem}
        {' '}
        items left
      </span>

      <nav className="filter" data-cy="Filter">
        <NavLink
          data-cy="FilterLinkAll"
          to="/"
          className={({ isActive }) => `filter__link ${isActive ? 'selected' : ''}`}
        >
          All
        </NavLink>

        <NavLink
          data-cy="FilterLinkActive"
          to="active"
          className={({ isActive }) => `filter__link ${isActive ? 'selected' : ''}`}
        >
          Active
        </NavLink>
        <NavLink
          data-cy="FilterLinkCompleted"
          to="completed"
          className={({ isActive }) => `filter__link ${isActive ? 'selected' : ''}`}
        >
          Completed
        </NavLink>
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
