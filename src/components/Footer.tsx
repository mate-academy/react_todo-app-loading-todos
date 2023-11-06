import React from 'react';
import classNames from 'classnames';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

type Props = {
  filterStatus: Status;
  setFilterStatus: (value: Status) => void;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({
  filterStatus,
  setFilterStatus,
  todos,
}) => {
  const uncompletedTodos = todos.filter(todo => !todo.completed).length;

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {uncompletedTodos === 1 ? '1 item left' : `${uncompletedTodos} items left`}
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: filterStatus === Status.All,
              })}
              data-cy="FilterLinkAll"
              onClick={() => setFilterStatus(Status.All)}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: filterStatus === Status.Active,
              })}
              data-cy="FilterLinkActive"
              onClick={() => setFilterStatus(Status.Active)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: filterStatus === Status.Completed,
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => setFilterStatus(Status.Completed)}
            >
              Completed
            </a>
          </nav>

          {/* don't show this button if there are no completed todos */}
          {uncompletedTodos !== todos.length && (
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
};
