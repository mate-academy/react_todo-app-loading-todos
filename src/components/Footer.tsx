import React from 'react';

type Props = {
  count: number,
};

export const Footer: React.FC<Props> = ({ count }) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${count} items left`}
      </span>

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
