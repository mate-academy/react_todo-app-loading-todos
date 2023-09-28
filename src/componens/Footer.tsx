import classNames from 'classnames';
import { Todo } from '../types/Todo';

enum StatusFilter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

interface Props {
  status: string,
  setStatus: React.Dispatch<React.SetStateAction<StatusFilter>>
  todos: Todo[]
}

export const Footer: React.FC<Props> = ({ status, setStatus, todos }) => {
  return (
    <footer
      className="todoapp__footer"
      data-cy="Footer"
    >
      <span
        data-cy="TodosCounter"
        className="todo-count"
      >
        {`${todos.length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav
        className="filter"
        data-cy="Filter"
      >
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={
            classNames('filter__link',
              { selected: status === StatusFilter.ALL })
          }
          onClick={(e) => {
            e.preventDefault();
            setStatus(StatusFilter.ALL);
          }}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={
            classNames('filter__link',
              { selected: status === StatusFilter.ACTIVE })
          }
          onClick={(e) => {
            e.preventDefault();
            setStatus(StatusFilter.ACTIVE);
          }}
        >
          Active
        </a>

        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={
            classNames('filter__link',
              { selected: status === StatusFilter.COMPLETED })
          }
          onClick={(e) => {
            e.preventDefault();
            setStatus(StatusFilter.COMPLETED);
          }}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
