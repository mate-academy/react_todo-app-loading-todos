import classNames from 'classnames';

import { useMemo } from 'react';

import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

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
  const uncompletedTodosCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  return (
    <footer className="todoapp__footer">
      {/* Hide the footer if there are no todos */}
      <span className="todo-count">
        {`${uncompletedTodosCount} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: status === Status.All,
          })}
          onClick={() => onStatusChange(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: status === Status.Active,
          })}
          onClick={() => onStatusChange(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: status === Status.Completed,
          })}
          onClick={() => onStatusChange(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
