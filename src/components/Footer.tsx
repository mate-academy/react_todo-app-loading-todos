import React from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/StatusType';

type Props = {
  todos: Todo[];
  filterStatus: Status;
  setFilterStatus: (status: Status) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  filterStatus,
  setFilterStatus,
}) => {
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <button
          type="button"
          className={`filter__link ${filterStatus === Status.All ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setFilterStatus(Status.All)}
        >
          All
        </button>

        <button
          type="button"
          className={`filter__link ${
            filterStatus === Status.Active ? 'selected' : ''
          }`}
          data-cy="FilterLinkActive"
          onClick={() => setFilterStatus(Status.Active)}
        >
          Active
        </button>

        <button
          type="button"
          className={`filter__link ${
            filterStatus === Status.Completed ? 'selected' : ''
          }`}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterStatus(Status.Completed)}
        >
          Completed
        </button>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
