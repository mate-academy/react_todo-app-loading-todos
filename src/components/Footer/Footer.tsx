/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Todo } from '../../types/Todo';
import { FilterOption } from '../../types/FilterOption';

interface Props {
  todos: Todo[];
  filter: string;
  setFilter: (filter: FilterOption) => void;
}

export const Footer: React.FC<Props> = ({ todos, filter, setFilter }) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">3 items left</span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a href="#/" className="filter__link selected">
          All
        </a>

        <a href="#/active" className="filter__link">
          Active
        </a>

        <a href="#/completed" className="filter__link">
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
