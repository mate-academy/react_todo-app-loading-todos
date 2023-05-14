import React from 'react';
import { Select } from '../../types/Select';

interface Props {
  onSelect: (value: Select) => void;
}

export const Footer: React.FC<Props> = ({ onSelect }) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className="filter__link selected"
          onClick={() => onSelect(Select.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className="filter__link"
          onClick={() => onSelect(Select.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className="filter__link"
          onClick={() => onSelect(Select.Completed)}
        >
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
