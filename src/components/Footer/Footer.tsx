import classNames from 'classnames';
import '../../styles/todoapp.scss';
import { Query } from '../../types/Query';

interface Props {
  activeCount: number;
  completedCount: number;
  handleClearCompleted: () => Promise<void>;
  query: Query;
  setQuery: (query: Query) => void;
}

export const Footer: React.FC<Props> = ({
  activeCount,
  completedCount,
  handleClearCompleted,
  query,
  setQuery,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: query === 'All',
          })}
          data-cy="FilterLinkAll"
          onClick={() => setQuery('All')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: query === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => setQuery('Active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: query === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setQuery('Completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      {completedCount > 0 && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
