import classNames from 'classnames';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  count: number;
  handleStatusChange: (newStatus: Filter) => void;
  status: Filter;
  clearCompleted: () => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  count,
  handleStatusChange,
  status,
  clearCompleted,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {count} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: status === Filter.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleStatusChange(Filter.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: status === Filter.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleStatusChange(Filter.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: status === Filter.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleStatusChange(Filter.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
