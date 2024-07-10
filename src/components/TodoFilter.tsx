import React from 'react';
import { Status } from '../types/Status';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  setStatus: (status: Status) => void;
  status: Status;
  todos: Todo[];
};

export const TodoFilter: React.FC<Props> = ({ setStatus, status, todos }) => {
  const activeTodos = todos.filter(todo => !todo.completed);
  const isAnyCompletedTodo = activeTodos.length !== todos.length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: status === Status.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setStatus(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: status === Status.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setStatus(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: status === Status.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setStatus(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isAnyCompletedTodo}
      >
        Clear completed
      </button>
    </footer>
  );
};
