import React from 'react';
import classNames from 'classnames';

interface Props {
  filterBy: string;
  setFilterBy: (filter: string) => void;
}

export const TodoFilter: React.FC<Props> = ({ filterBy, setFilterBy }) => {
  return (
    <nav className="filter">
      <a
        href="#/"
        className={classNames('filter__link',
          { selected: filterBy === 'All' })}
        onClick={() => setFilterBy('All')}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link',
          { selected: filterBy === 'Active' })}
        onClick={() => setFilterBy('Active')}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link',
          { selected: filterBy === 'Completed' })}
        onClick={() => setFilterBy('Completed')}
      >
        Completed
      </a>
    </nav>
  );
};
