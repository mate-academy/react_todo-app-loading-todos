import React, { useState } from 'react';

type Props = {
  changeQuery: (query: string) => void,
};

export const Footer: React.FC<Props> = ({ changeQuery }) => {
  const [status, setStatus] = useState('All');

  const handleClickAll = () => {
    changeQuery('All');
    setStatus('All');
  };

  const handleClickActive = () => {
    changeQuery('Active');
    setStatus('Active');
  };

  const handleClickCompleted = () => {
    changeQuery('Completed');
    setStatus('Completed');
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          onClick={handleClickAll}
          href="#/"
          className={`filter__link ${status === 'All' && 'selected'}`}
        >
          All
        </a>

        <a
          onClick={handleClickActive}
          href="#/active"
          className={`filter__link ${status === 'Active' && 'selected'}`}
        >
          Active
        </a>

        <a
          onClick={handleClickCompleted}
          href="#/completed"
          className={`filter__link ${status === 'Completed' && 'selected'}`}
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
