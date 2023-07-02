import React, { memo } from 'react';
import cN from 'classnames';

type Props = {
  amountTodos: number,
  filterStatus: string,
  selectFilter: (event: React.MouseEvent) => void,
  hasCompleted: boolean,
  // clearCompleted: () => void
};

export const TodoFilter: React.FC<Props> = memo(
  ({
    amountTodos,
    filterStatus,
    selectFilter,
    hasCompleted,
  }) => {
    return (
      <footer className="todoapp__footer">
        <span className="todo-count">
          {`${amountTodos} items left`}
        </span>

        {/* Active filter should have a 'selected' class */}
        <nav className="filter">
          <a
            href="#/"
            className={cN('filter__link', {
              selected: filterStatus === 'all',
            })}
            onClick={selectFilter}
          >
            All
          </a>

          <a
            href="#/active"
            className={cN('filter__link', {
              selected: filterStatus === 'active',
            })}
            onClick={selectFilter}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={cN('filter__link', {
              selected: filterStatus === 'completed',
            })}
            onClick={selectFilter}
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
    );
  },
);
