import React from 'react';
import classNames from 'classnames';
import { StatusOfTodos } from '../types/StatusOfTodos';

type Props = {
  status: StatusOfTodos,
  setStatus: (value: StatusOfTodos) => void,
};

export const Footer: React.FC<Props> = ({ status, setStatus }) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: status === StatusOfTodos.All,
          })}
          onClick={() => setStatus(StatusOfTodos.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: status === StatusOfTodos.Active,
          })}
          onClick={() => setStatus(StatusOfTodos.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: status === StatusOfTodos.Completed,
          })}
          onClick={() => setStatus(StatusOfTodos.Completed)}
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
