import classNames from 'classnames';
import { TodoStatusFilter } from '../../types/TodoStatusFilter';

type FooterProps = {
  selectedFilter: TodoStatusFilter;
  setSelectedFilter: (state: TodoStatusFilter) => void;
  activeTodosCount: number;
  completedTodosCount: number;
};

export const Footer: React.FC<FooterProps> = ({
  selectedFilter,
  setSelectedFilter,
  activeTodosCount,
  completedTodosCount,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectedFilter === TodoStatusFilter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setSelectedFilter(TodoStatusFilter.All)}
        >
          {TodoStatusFilter.All}
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selectedFilter === TodoStatusFilter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setSelectedFilter(TodoStatusFilter.Active)}
        >
          {TodoStatusFilter.Active}
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selectedFilter === TodoStatusFilter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setSelectedFilter(TodoStatusFilter.Completed)}
        >
          {TodoStatusFilter.Completed}
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodosCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
