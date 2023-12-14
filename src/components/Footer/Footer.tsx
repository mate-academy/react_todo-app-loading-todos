import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  onFilter: (filterType: string) => void;
  todos: Todo[];
  filterBy: string;
};

export const Footer: React.FC<Props> = ({
  onFilter,
  todos,
  filterBy,
}) => {
  const handleFilterChange = (filterType: string) => {
    onFilter(filterType);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames(
            'filter__link', { selected: filterBy === 'all' },
          )}
          data-cy="FilterLinkAll"
          onClick={() => handleFilterChange('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link', { selected: filterBy === 'active' },
          )}
          data-cy="FilterLinkActive"
          onClick={() => handleFilterChange('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link', { selected: filterBy === 'completed' },
          )}
          data-cy="FilterLinkCompleted"
          onClick={() => handleFilterChange('completed')}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => handleFilterChange('active')}
      >
        Clear completed
      </button>
    </footer>
  );
};
