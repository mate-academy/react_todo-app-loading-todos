import classNames from 'classnames';
import React from 'react';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  filter: Status,
  setFilter: (status: Status) => void
};

export const TodoFooter:React.FC<Props> = ({ todos, filter, setFilter }) => {
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
            { selected: filter === Status.All },
          )}
          onClick={() => setFilter(Status.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filter === Status.Active },
          )}
          onClick={() => setFilter(Status.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filter === Status.Completed },
          )}
          onClick={() => setFilter(Status.Completed)}
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
};
