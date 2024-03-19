import cn from 'classnames';

type Props = {
  selectedFilter: string;
  onSelect: (a: string) => void;
  count: number;
};

export const Footer: React.FC<Props> = ({
  selectedFilter,
  onSelect,
  count,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${count} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: selectedFilter === 'All',
          })}
          data-cy="FilterLinkAll"
          onClick={() => onSelect('All')}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: selectedFilter === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => onSelect('Active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: selectedFilter === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onSelect('Completed')}
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
