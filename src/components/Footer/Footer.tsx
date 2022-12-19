import classNames from 'classnames';
import React from 'react';

interface Props {
  itemsLeft: number,
  clearCompleted: () => void
  setCurrentFilter: (filter: string) => void,
  currentFilter: string,
}

export const Footer: React.FC<Props> = ({
  setCurrentFilter,
  clearCompleted,
  itemsLeft,
  currentFilter,
}) => {
  const handleFilterButton = (filter: string) => {
    setCurrentFilter(filter);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${itemsLeft} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link', {
            selected: currentFilter === 'all',
          })}
          onClick={() => handleFilterButton('all')}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          // className="filter__link"
          className={classNames('filter__link', {
            selected: currentFilter === 'active',
          })}
          onClick={() => handleFilterButton('active')}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link', {
            selected: currentFilter === 'completed',
          })}
          onClick={() => handleFilterButton('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        onClick={() => clearCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
};
