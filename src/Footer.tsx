import cn from 'classnames';
import { Status } from './types/Status';

interface Props {
  todosCounter: number,
  filterBy: Status,
  setFilterBy: (v: Status) => void,
}

export const Footer: React.FC<Props> = ({
  todosCounter,
  filterBy,
  setFilterBy,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todosCounter} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterBy === Status.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterBy(Status.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterBy === Status.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterBy(Status.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterBy === Status.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterBy(Status.COMPLETED)}
        >
          Completed
        </a>
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
