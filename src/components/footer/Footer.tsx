import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | null;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  statusFilter,
  setStatusFilter,
}) => {
  const setStatus = (
    val: string,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setStatusFilter(val);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos && todos.filter(todo => !todo.completed).length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${statusFilter === 'all' ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={event => {
            setStatus('all', event);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${statusFilter === 'active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={event => {
            setStatus('active', event);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${statusFilter === 'completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={event => {
            setStatus('completed', event);
          }}
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
