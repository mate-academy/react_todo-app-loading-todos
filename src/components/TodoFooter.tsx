/* eslint-disable react/jsx-one-expression-per-line */
import classNames from 'classnames';
import React from 'react';
import { TodoStatus } from '../types/Todo';

type Props = {
  onFilter: (status: TodoStatus) => void,
  selected: TodoStatus,
  todosAmount: number,
  completedAmount: number
};

const TodoFooter: React.FC<Props> = ({
  onFilter,
  selected,
  completedAmount,
  todosAmount,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {todosAmount} items left
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selected === TodoStatus.All,
          })}
          onClick={() => onFilter(TodoStatus.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selected === TodoStatus.Active,
          })}
          onClick={() => onFilter(TodoStatus.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selected === TodoStatus.Completed,
          })}
          onClick={() => onFilter(TodoStatus.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={completedAmount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default TodoFooter;
