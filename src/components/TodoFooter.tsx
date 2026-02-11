import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { FILTERS, Filter } from '../constants/filters';

type Props = {
  todos: Todo[];
  footerFilter: Filter;
  setFooterFilter: (filter: Filter) => void;
};

export function TodoFooter({ todos, footerFilter, setFooterFilter }: Props) {
  const activeCount = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: footerFilter === FILTERS.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFooterFilter(FILTERS.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: footerFilter === FILTERS.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFooterFilter(FILTERS.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: footerFilter === FILTERS.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFooterFilter(FILTERS.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
}
