import classNames from 'classnames';
import React from 'react';

interface FooterProps {
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  activeCount: number;
}

export const Footer: React.FC<FooterProps> = ({
  filter,
  setFilter,
  activeCount,
}) => {
  const itemCountText = `${activeCount} ${activeCount === 1 ? 'item' : 'items'} left`;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemCountText}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', { selected: filter === 'all' })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter('all')}
        >
          All
        </a>
        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter('active')}
        >
          Active
        </a>
        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter('completed')}
        >
          Completed
        </a>
      </nav>

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
