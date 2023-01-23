import classNames from 'classnames';
import React, { memo } from 'react';
// eslint-disable-next-line import/no-cycle
import { Status } from '../../App';

export type Props = {
  onStatus(value: Status) :void
  statusTodo: Status
};

export const TodoFooter: React.FC<Props> = memo(({ onStatus, statusTodo }) => {
  const handlerActive = () => {
    onStatus(Status.Active);
  };

  const handlerAll = () => {
    onStatus(Status.All);
  };

  const handleComplete = () => {
    onStatus(Status.Completed);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        4 items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link', { selected: statusTodo === Status.All },
          )}
          onClick={handlerAll}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link', { selected: statusTodo === Status.Active },
          )}
          onClick={handlerActive}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link', { selected: statusTodo === Status.Completed },
          )}
          onClick={handleComplete}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
});
