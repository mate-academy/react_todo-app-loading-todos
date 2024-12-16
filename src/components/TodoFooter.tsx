import cn from 'classnames';
// import { Completed } from '../types/Completed';
import { Status } from '../types/Status';

type Props = {
  notCompletedTodos: number;
  // completed: Completed[];
  // setCompleted: (completed: Completed[]) => void;
  status: Status;
  setStatus: (status: Status) => void;
};

export const TodoFooter: React.FC<Props> = ({
  notCompletedTodos,
  status,
  setStatus,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: status === Status.All })}
          data-cy="FilterLinkAll"
          onClick={() => setStatus(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: status === Status.Active })}
          data-cy="FilterLinkActive"
          onClick={() => setStatus(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: status === Status.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setStatus(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        // onClick={() => setCompleted([])}
        // disabled={completed.length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
