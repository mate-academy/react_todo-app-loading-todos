import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

type Props = {
  todos: Todo[];
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
};

export const TodoFilter: React.FC<Props> = (props) => {
  const { todos, status, setStatus } = props;

  // const activeTodos = useMemo(
  //   () => todos.filter(todo => !todo.completed),
  //   [],
  // );

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            {
              selected: status === Status.All,
            },
          )}
          onClick={
            () => setStatus(Status.All)
          }
        >
          {Status.All}
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            {
              selected: status === Status.Active,
            },
          )}
          onClick={
            () => setStatus(Status.Active)
          }
        >
          {Status.Active}
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            {
              selected: status === Status.Completed,
            },
          )}
          onClick={
            () => setStatus(Status.Completed)
          }
        >
          {Status.Completed}
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
};
