import classNames from 'classnames';
import React from 'react';
import { Status } from '../types/Todo';

type Props = {
  filterBy: Status,
  setFilterBy: (filterBy: Status) => void,
  activeTodosCount: number,
  completedTodosCount: number,
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  activeTodosCount,
  completedTodosCount,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodosCount} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterBy === Status.All,
          })}
          onClick={() => setFilterBy(Status.All)}
        >
          All
        </a>

        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterBy === Status.Active,
          })}
          onClick={() => setFilterBy(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterBy === Status.Completed,
          })}
          onClick={() => setFilterBy(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={completedTodosCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
