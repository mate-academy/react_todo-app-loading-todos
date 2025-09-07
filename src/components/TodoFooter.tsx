import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

type Props = {
  todos: Todo[];
  status: Status;
  onStatusChange: (status: Status) => void;
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  status,
  onStatusChange,
}) => {
  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);

  const handleStatusChange = (
    event: React.MouseEvent<HTMLAnchorElement>,
    newStatus: Status,
  ) => {
    event.preventDefault();
    onStatusChange(newStatus);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', { selected: status === 'All' })}
          data-cy="FilterLinkAll"
          onClick={e => handleStatusChange(e, Status.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: status === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={e => handleStatusChange(e, Status.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: status === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={e => handleStatusChange(e, Status.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedTodos.length}
      >
        Clear completed
      </button>
    </footer>
  );
};
