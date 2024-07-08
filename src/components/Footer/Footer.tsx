import { FC } from 'react';

import { Status } from '../../types/statusTypes';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedStatus: Status;
  setSelectedStatus: (status: Status) => void;
}

export const Footer: FC<Props> = ({
  todos,
  selectedStatus,
  setSelectedStatus,
}) => {
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosCount} ${activeTodosCount === 1 ? 'item' : 'items'} left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${selectedStatus === Status.All ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setSelectedStatus(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${selectedStatus === Status.Active ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => setSelectedStatus(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${selectedStatus === Status.Completed ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setSelectedStatus(Status.Completed)}
        >
          Completed
        </a>
      </nav>

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
