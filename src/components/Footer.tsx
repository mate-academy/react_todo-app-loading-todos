import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { FilterMethods } from '../types/Methods';

interface FooterProps {
  checkCount: (todos: Todo[]) => number;
  setFilter: (string: FilterMethods) => void;
  todos: Todo[];
  filterMethod: FilterMethods;
  clear: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  checkCount,
  setFilter,
  todos,
  filterMethod,
  clear,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${checkCount(todos)} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames(
            filterMethod === 'All' ? 'filter__link selected' : 'filter__link',
          )}
          data-cy="FilterLinkAll"
          onClick={e => {
            e.preventDefault();
            setFilter('All');
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            filterMethod === 'Active'
              ? 'filter__link selected'
              : 'filter__link',
          )}
          data-cy="FilterLinkActive"
          onClick={e => {
            e.preventDefault();
            setFilter('Active');
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            filterMethod === 'Completed'
              ? 'filter__link selected'
              : 'filter__link',
          )}
          data-cy="FilterLinkCompleted"
          onClick={e => {
            e.preventDefault();
            setFilter('Completed');
          }}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      {todos.some(el => el.completed === true) && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={e => {
            e.preventDefault();
            clear();
          }}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
