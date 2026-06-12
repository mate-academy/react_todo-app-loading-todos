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

const FILTER_VALUES: Query[] = ['All', 'Active', 'Completed'];

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
        {FILTER_VALUES.map(filterValue => (
          <a
            key={filterValue}
            href={
              filterValue !== 'All'
                ? `#/${filterValue.toLocaleLowerCase()}`
                : ''
            }
            className={classNames('filter__link', {
              selected: query === filterValue,
            })}
            data-cy={`FilterLink${filterValue}`}
            onClick={() => setQuery(filterValue)}
          >
            {filterValue}
          </a>
        ))}
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
