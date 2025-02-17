import classNames from 'classnames';
import { FilterOptions } from '../types/FilterOptions';
import { Todo } from '../types';

type Props = {
  todos: Todo[];
  filter: FilterOptions;
  setFilter: (filter: FilterOptions) => void;
};

export const Footer: React.FC<Props> = ({ todos, filter, setFilter }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === FilterOptions.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(FilterOptions.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === FilterOptions.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(FilterOptions.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === FilterOptions.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(FilterOptions.COMPLETED)}
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
};
