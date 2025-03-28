import React from 'react';
import cn from 'classnames';
import { TodoStatus } from '../types/TodoStatus';

type Props = {
  filterBy: TodoStatus;
  setFilterBy: (value: TodoStatus) => void;
  activeCount: number;
};

export const Footer: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  activeCount,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterBy === TodoStatus.all,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterBy(TodoStatus.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterBy === TodoStatus.active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterBy(TodoStatus.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterBy === TodoStatus.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterBy(TodoStatus.completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
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
