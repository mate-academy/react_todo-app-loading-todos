import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

enum Status {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

interface Props {
  todos: Todo[],
  setStatus: (status: string) => void,
  status: string,
}

export const Footer: React.FC<Props> = ({ todos, setStatus, status }) => {
  const isActiveTodos = todos.some(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodos} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: status === Status.ALL },
          )}
          onClick={() => setStatus(Status.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: status === Status.ACTIVE },
          )}
          onClick={() => setStatus(Status.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: status === Status.COMPLETED },
          )}
          onClick={() => setStatus(Status.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      {
        isActiveTodos && (
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        )
      }
    </footer>
  );
};
