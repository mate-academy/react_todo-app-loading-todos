import React from 'react';
import classNames from 'classnames';
import { TodoStatus } from '../../types/TodoStatus/TodoStatus';

type Props = {
  handleFilter: (value: TodoStatus) => void,
  activeFilter: TodoStatus,
};

export const TodoFooter: React.FC<Props> = ({
  handleFilter,
  activeFilter,
}) => {
  return (
    <>
      <span className="todo-count">
        3 items left
      </span>
      <nav className="filter">
        <a
          href={`#/${TodoStatus.All}`}
          className={classNames('filter__link', {
            selected: activeFilter === 'All',
          })}
          onClick={() => handleFilter(TodoStatus.All)}
        >
          {TodoStatus.All}
        </a>

        <a
          href={`#/${TodoStatus.Active}`}
          className={classNames('filter__link', {
            selected: activeFilter === 'Active',
          })}
          onClick={() => handleFilter(TodoStatus.Active)}
        >
          {TodoStatus.Active}
        </a>

        <a
          href={`#/${TodoStatus.Completed}`}
          className={classNames('filter__link', {
            selected: activeFilter === 'Completed',
          })}
          onClick={() => handleFilter(TodoStatus.Completed)}
        >
          {TodoStatus.Completed}
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </>
  );
};
