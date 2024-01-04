import React from 'react';
import cn from 'classnames';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

type Props = {
  filter: Status;
  setFilter: (status: Status) => void;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({
  filter = Status.ALL,
  setFilter,
  todos,
}) => {
  const numberActiveTodos = todos.filter(todo => !todo.completed).length;
  const isCompletedTodos = Boolean(todos.length - numberActiveTodos);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      {numberActiveTodos === 1 ? (
        <span className="todo-count" data-cy="todosCounter">
          1 item left
        </span>
      ) : (
        <span className="todo-count" data-cy="todosCounter">
          {`${numberActiveTodos} items left`}
        </span>
      )}

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filter === Status.ALL })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(Status.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: filter === Status.ACTIVE })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(Status.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === Status.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(Status.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
