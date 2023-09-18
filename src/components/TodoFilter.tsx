import React from 'react';
import classNames from 'classnames';
import { FilterStatus } from '../types/Todo';

type Props = {
  selected: FilterStatus;
  filter: (status: FilterStatus) => void;
  todosTotalAmount: number;
  completedTodosAmount: number;
};

export const TodoFilter: React.FC<Props> = ({
  selected,
  filter,
  todosTotalAmount,
  completedTodosAmount,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todosTotalAmount} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link',
            { selected: selected === FilterStatus.All })}
          onClick={() => filter(FilterStatus.All)}
        >
          All
        </a>

        <a
          href="#/"
          className={classNames('filter__link',
            { selected: selected === FilterStatus.Active })}
          onClick={() => filter(FilterStatus.Active)}
        >
          Active
        </a>

        <a
          href="#/"
          className={classNames('filter__link',
            { selected: selected === FilterStatus.Completed })}
          onClick={() => filter(FilterStatus.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={completedTodosAmount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
