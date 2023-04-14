import React from 'react';
import classNames from 'classnames';

type Props = {
  activeFilter: string,
  handleFilterAll: () => void,
  handleFilterActive: () => void,
  handleFilterCompleted: () => void,
};

export const TodoFooter: React.FC<Props> = ({
  handleFilterAll,
  handleFilterActive,
  handleFilterCompleted,
  activeFilter,
}) => {
  return (
    <>
      <span className="todo-count">
        3 items left
      </span>
      <nav className="filter">
        <a
          href="#/all"
          className={classNames('filter__link', {
            selected: activeFilter === 'all',
          })}
          onClick={handleFilterAll}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: activeFilter === 'active',
          })}
          onClick={handleFilterActive}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: activeFilter === 'completed',
          })}
          onClick={handleFilterCompleted}
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
    </>
  );
};
