import React, { useContext } from 'react';
import classNames from 'classnames';
import { Status } from '../types/Status';
import { TodosContext } from '../providers/TodosProvider';

type Props = {
  status: Status;
  onStatusChange: (status: Status) => void;
};

export const TodoAppFooter: React.FC<Props> = ({ status, onStatusChange }) => {
  const { todos } = useContext(TodosContext);

  const remainingTodos = todos.filter((todo) => !todo.completed).length;
  const canClearCompleted = todos.some((todo) => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${remainingTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.entries(Status).map(([statusName, value]) => (
          <a
            key={statusName}
            href={value}
            className={classNames(
              'filter__link',
              { selected: status === value },
            )}
            data-cy={`filterLink${statusName}`}
            onClick={() => onStatusChange(value)}
          >
            {statusName}
          </a>
        ))}
      </nav>

      {/* Should delete all completed todos onClick */}
      {canClearCompleted && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
