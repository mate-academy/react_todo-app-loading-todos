import cn from 'classnames';
import { Status } from '../../types/Status';

type Props = {
  itemsLeft: number
  status: Status
  setStatus: (arg: Status) => void
  isSomeCompleted: boolean
};

export const Footer: React.FC<Props> = ({
  itemsLeft,
  status,
  setStatus,
  isSomeCompleted,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${itemsLeft} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: status === Status.all,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setStatus(Status.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: status === Status.active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setStatus(Status.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: status === Status.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setStatus(Status.completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isSomeCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
