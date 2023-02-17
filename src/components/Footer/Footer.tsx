import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

type Props = {
  todos: Todo[],
  status: Status,
  setStatus: (status: Status) => void,
};

export const Footer: React.FC<Props> = ({
  todos,
  status,
  setStatus,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todos.length} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={
            classNames(
              'filter__link',
              {
                selected: status === Status.All,
              },
            )
          }
          onClick={() => {
            setStatus(Status.All);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={
            classNames(
              'filter__link',
              {
                selected: status === Status.Active,
              },
            )
          }
          onClick={() => {
            setStatus(Status.Active);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={
            classNames(
              'filter__link',
              {
                selected: status === Status.Completed,
              },
            )
          }
          onClick={() => {
            setStatus(Status.Completed);
          }}
        >
          Completed
        </a>
      </nav>

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
