import React from 'react';
import classnames from 'classnames';

interface Props {
  onStatusChanged: (newStatus: string) => void
  status: string
  itemsLeft: number
  itemsCompleted: number
}

enum TodoStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoFilter: React.FC<Props> = ({
  onStatusChanged,
  status,
  itemsLeft,
  itemsCompleted,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={
            classnames(
              'filter__link',
              { selected: status === TodoStatus.All },
            )
          }
          onClick={() => onStatusChanged(TodoStatus.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={
            classnames(
              'filter__link',
              { selected: status === TodoStatus.Active },
            )
          }
          onClick={() => onStatusChanged(TodoStatus.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={
            classnames(
              'filter__link',
              { selected: status === TodoStatus.Completed },
            )
          }
          onClick={() => onStatusChanged(TodoStatus.Completed)}
        >
          Completed
        </a>
      </nav>

      {
        itemsCompleted !== 0
        && (
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        )
      }
    </footer>
  );
};
