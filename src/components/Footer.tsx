import { Link } from 'react-router-dom';
import React from 'react';
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
        {`${todos.filter((t: Todo) => !t.completed).length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <Link
          data-cy="FilterLinkAll"
          to="#/"
          className={`filter__link ${filterMode === 'all' ? 'selected' : ''}`}
          onClick={() => {
            filterModeHandler('all');
          }}
        >
          All
        </Link>

        <Link
          data-cy="FilterLinkActive"
          to="#/active"
          className={`filter__link ${filterMode === 'active' ? 'selected' : ''}`}
          onClick={() => {
            filterModeHandler('active');
          }}
        >
          Active
        </Link>
        <Link
          data-cy="FilterLinkCompleted"
          to="#/completed"
          className={`filter__link ${filterMode === 'complete' ? 'selected' : ''}`}
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
