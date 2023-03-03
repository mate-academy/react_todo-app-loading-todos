import { Link } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  filterModeHandler: (filterMode: string) => void,
  clearCompletedHandler: () => void,
  filterMode: string,
};

export const Footer: React.FC<Props> = ({
  todos,
  filterModeHandler,
  clearCompletedHandler,
  filterMode,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter((todo: Todo) => !todo.completed).length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <Link
          data-cy="FilterLinkAll"
          to="#/"
          className={classNames('filter__link', {
            selected: filterMode === 'all',
          })}
          onClick={() => {
            filterModeHandler('all');
          }}
        >
          All
        </Link>

        <Link
          data-cy="FilterLinkActive"
          to="#/active"
          className={classNames('filter__link', {
            selected: filterMode === 'active',
          })}
          onClick={() => {
            filterModeHandler('active');
          }}
        >
          Active
        </Link>
        <Link
          data-cy="FilterLinkCompleted"
          to="#/completed"
          className={classNames('filter__link', {
            selected: filterMode === 'complete',
          })}
          onClick={() => {
            filterModeHandler('complete');
          }}
        >
          Completed
        </Link>
      </nav>
      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        onClick={clearCompletedHandler}
      >
        Clear completed
      </button>
    </footer>
  );
};
