import React from 'react';
import classNames from 'classnames';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[];
  status: Status;
  setStatus: (status: Status) => void;
}

export const Footer: React.FC<Props> = ({ todos, status, setStatus }) => {
  const todosLeft = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todosLeft} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: status === Status.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setStatus(Status.ALL)}
        >
          {Status.ALL}
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: status === Status.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setStatus(Status.ACTIVE)}
        >
          {Status.ACTIVE}
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: status === Status.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setStatus(Status.COMPLETED)}
        >
          {Status.COMPLETED}
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
