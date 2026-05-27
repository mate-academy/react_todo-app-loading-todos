import classNames from 'classnames';
import React from 'react';

type Props = {
  activeTodos: number;
  statusTodo: string;
  setStatusTodo: (value: string) => void;
};

export const Footer: React.FC<Props> = ({
  activeTodos,
  statusTodo,
  setStatusTodo,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: statusTodo === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => setStatusTodo('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: statusTodo === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => setStatusTodo('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: statusTodo === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setStatusTodo('completed')}
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
