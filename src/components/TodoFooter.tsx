import cn from 'classnames';
import { TodoFilter } from '../types/TodoFilter';

type Props = {
  onSetFilter: (filter: TodoFilter) => void;
  activeListLength?: number;
  filter: TodoFilter;
};

export const TodoFooter: React.FC<Props> = ({
  onSetFilter,
  activeListLength,
  filter,
}) => {
  function handleFilter(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const newFilter = event.currentTarget.textContent as TodoFilter;

    onSetFilter(newFilter);
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeListLength} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filter === TodoFilter.all,
          })}
          data-cy="FilterLinkAll"
          onClick={handleFilter}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filter === TodoFilter.active,
          })}
          data-cy="FilterLinkActive"
          onClick={handleFilter}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === TodoFilter.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={handleFilter}
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
