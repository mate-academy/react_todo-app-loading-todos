import classNames from 'classnames';
import { Filter } from '../../types/Filter';

type Props = {
  onFilterChange: (value: Filter) => void;
  hasCompleted: boolean;
  handleClearCompleted: () => void;
  countOfTodos: number;
  filter: Filter;
};

export const Footer: React.FC<Props> = ({
  onFilterChange,
  hasCompleted,
  handleClearCompleted,
  countOfTodos,
  filter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countOfTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', { selected: filter === 'all' })}
          data-cy="FilterLinkAll"
          onClick={() => {
            onFilterChange('all');
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => {
            onFilterChange('active');
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            onFilterChange('completed');
          }}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      {hasCompleted && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={() => handleClearCompleted()}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
