import classNames from 'classnames';

type FilterType = 'all' | 'active' | 'completed';

type Props = {
  isAnyCompleted: boolean;
  notCompletedCount: number;
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

export const Footer = ({
  isAnyCompleted,
  notCompletedCount,
  selectedFilter,
  onFilterChange,
}: Props) => {
  const handleFilterChange = (
    event: React.MouseEvent<HTMLAnchorElement>,
    filter: FilterType,
  ) => {
    event.preventDefault();

    onFilterChange(filter);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${notCompletedCount} items left`}
      </span>
      {/* Hide the Footer if there are no todos */}

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectedFilter === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={event => handleFilterChange(event, 'all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selectedFilter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={event => handleFilterChange(event, 'active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selectedFilter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={event => handleFilterChange(event, 'completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isAnyCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
