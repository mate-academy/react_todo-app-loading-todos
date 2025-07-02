import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  filterStatus: string;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
};

export const Footer: React.FC<Props> = ({
  todos,
  filterStatus,
  setFilterStatus,
}) => {
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeCount} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterStatus === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterStatus('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterStatus === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterStatus('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterStatus === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterStatus('completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
