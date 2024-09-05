import React from 'react';
import classNames from 'classnames';
import { TodoStatus } from '../../enums/TodoStatus';

type Props = {
  onClick: (status: TodoStatus) => void;
  status: TodoStatus;
  leftItems: number;
};

export const Footer: React.FC<Props> = ({ onClick, status, leftItems }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {leftItems + ' items left'}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: status === TodoStatus.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onClick(TodoStatus.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: status === TodoStatus.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => onClick(TodoStatus.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: status === TodoStatus.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onClick(TodoStatus.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
