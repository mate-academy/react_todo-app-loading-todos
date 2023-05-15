import React from 'react';
import classNames from 'classnames';

type Props = {
  activeTodosNumber: number;
  filter: string;
  setFilter: (filter: string) => void;
};

export const Footer: React.FC<Props> = ({
  activeTodosNumber,
  filter,
  setFilter,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodosNumber} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link',
            { selected: filter === 'all' })}
          onClick={() => setFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link',
            { selected: filter === 'active' })}
          onClick={() => setFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link',
            { selected: filter === 'completed' })}
          onClick={() => setFilter('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
