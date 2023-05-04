import React from 'react';
import classnames from 'classnames';

interface Props {
  onStatusChanged: (newStatus: string) => void
  status: string
  items: number
}

enum TodoStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoFilter: React.FC<Props> = ({
  onStatusChanged,
  status,
  items,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${items} items left`}
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

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
