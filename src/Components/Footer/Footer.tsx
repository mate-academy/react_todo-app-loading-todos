import { StatesOfFilter } from '../../types/StatesOfFilter';
import cn from 'classnames';

type Props = {
  onSetFilter: (state: StatesOfFilter) => void;
  countOfTodos: number;
  selectedFilter: StatesOfFilter;
};

export const Footer: React.FC<Props> = ({
  onSetFilter,
  countOfTodos,
  selectedFilter,
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
          className={cn('filter__link', {
            selected: selectedFilter === StatesOfFilter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onSetFilter(StatesOfFilter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: selectedFilter === StatesOfFilter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => {
            onSetFilter(StatesOfFilter.Active);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: selectedFilter === StatesOfFilter.Competed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onSetFilter(StatesOfFilter.Competed)}
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
