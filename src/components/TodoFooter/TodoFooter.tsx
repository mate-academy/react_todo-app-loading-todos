import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { Filters } from '../../types/Filters';

type Props = {
  todos: Todo[];
  currentFilter: Filters;
  setCurrentFilter: (filter: Filters) => void;
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  currentFilter,
  setCurrentFilter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => todo.completed === false).length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: currentFilter === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => setCurrentFilter(Filters.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: currentFilter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => setCurrentFilter(Filters.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: currentFilter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setCurrentFilter(Filters.COMPLETED)}
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
