import React, { useContext } from 'react';
import { Status } from '../types/Status';
import { TodosContext } from '../providers/TodosProvider';

type Props = {
  status: Status;
  onStatusChange: (status: Status) => void;
};

export const TodoAppFooter: React.FC<Props> = ({ status, onStatusChange }) => {
  const { todos } = useContext(TodosContext);

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${remainingTodos} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.entries(Status).map(([statusName, value]) => (
          <a
            key={statusName}
            href={value}
            className={`filter__link${value === status ? ' selected' : ''}`}
            data-cy={`filterLink${statusName}`}
            onClick={() => onStatusChange(value)}
          >
            {statusName}
          </a>
        ))}
      </nav>

      {/* don't show this button if there are no completed todos */}
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
