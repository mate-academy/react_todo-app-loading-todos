import React from 'react';
import cn from 'classnames';
import { Todo, Status } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setStatus: (status: Status) => void;
  status: Status
};
export const Footer: React.FC<Props> = (
  {
    todos,
    setStatus,
    status,
  },
) => {
  const itemsLeft = todos.filter(todo => !todo.completed).length;

  const handleClick = (value: Status) => {
    setStatus(value);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={cn(
            'filter__link',
            {
              selected: status === Status.ALL,
            },
          )}
          onClick={() => {
            handleClick(Status.ALL);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn(
            'filter__link',
            {
              selected: status === Status.ACTIVE,
            },
          )}
          onClick={() => {
            handleClick(Status.ACTIVE);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn(
            'filter__link',
            {
              selected: status === Status.COMPLETED,
            },
          )}
          onClick={() => {
            handleClick(Status.COMPLETED);
          }}
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
