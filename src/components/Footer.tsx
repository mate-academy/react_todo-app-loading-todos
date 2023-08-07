/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

type Props = {
  todos: Todo[],
  selectItem: Status,
  setSelectItem: React.Dispatch<React.SetStateAction<Status>>
};

const handleSelectFactory = (status: Status, setSelectItem: React.Dispatch<React.SetStateAction<Status>>) => () => {
  setSelectItem(status);
};

export const Footer: React.FC<Props> = ({
  todos,
  selectItem,
  setSelectItem,
}) => {
  const isActiveTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${isActiveTodos.length} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectItem === Status.ALL,
          })}
          onClick={handleSelectFactory(Status.ALL, setSelectItem)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selectItem === Status.ACTIVE,
          })}
          onClick={handleSelectFactory(Status.ACTIVE, setSelectItem)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selectItem === Status.COMPLETED,
          })}
          onClick={handleSelectFactory(Status.COMPLETED, setSelectItem)}
        >
          Completed
        </a>
      </nav>

      {!!todos.filter(todo => todo.completed).length && (
        <button
          type="button"
          className="todoapp__clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
