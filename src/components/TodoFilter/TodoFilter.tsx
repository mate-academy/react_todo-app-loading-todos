import React, { memo } from 'react';
import cN from 'classnames';
import { FilterBy } from '../../utils/enums';

type Props = {
  amountTodos: number,
  filterStatus: string,
  handleFilterChange: (event: React.MouseEvent) => void,
  hasCompleted: boolean,
};

export const TodoFilter: React.FC<Props> = memo(
  ({
    amountTodos,
    filterStatus,
    handleFilterChange,
    hasCompleted,
  }) => (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${amountTodos} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={cN('filter__link', {
            selected: filterStatus === FilterBy.ALL,
          })}
          onClick={handleFilterChange}
        >
          All
        </a>

        <a
          href="#/active"
          className={cN('filter__link', {
            selected: filterStatus === FilterBy.ACTIVE,
          })}
          onClick={handleFilterChange}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cN('filter__link', {
            selected: filterStatus === FilterBy.COMPLETED,
          })}
          onClick={handleFilterChange}
        >
          Completed
        </a>
      </nav>

      {hasCompleted && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  ),
);
