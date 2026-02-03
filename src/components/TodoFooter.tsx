import classNames from 'classnames';
import { Todo } from '../types/Todo';

type TodoFooterProps = {
  todosCounter: Todo[];
  footerFilter: string;
  setFooterFilter: (filter: string) => void;
};

export function TodoFooter({
  todosCounter,
  footerFilter,
  setFooterFilter,
}: TodoFooterProps) {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosCounter.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: footerFilter === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFooterFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: footerFilter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFooterFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: footerFilter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFooterFilter('completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
}
