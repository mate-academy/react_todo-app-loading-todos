import cn from 'classnames';

import { StatusFilter } from '../../types/StatusFilter';

interface FooterProps {
  activeTodos: number;
  completedTodos: number;
  filter: StatusFilter;
  setFilter: (newFilter: StatusFilter) => void;
}

export const Footer: React.FC<FooterProps> = ({
  activeTodos,
  completedTodos,
  filter,
  setFilter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn(
            'filter__link',
            { selected: filter === StatusFilter.ALL },
          )}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(StatusFilter.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn(
            'filter__link',
            { selected: filter === StatusFilter.ACTIVE },
          )}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(StatusFilter.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn(
            'filter__link',
            { selected: filter === StatusFilter.COMPLETED },
          )}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(StatusFilter.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {completedTodos && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
