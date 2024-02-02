import classNames from 'classnames';
import { TodoFilter, Todo } from '../../types';

interface Props {
  todos: Todo[];
  filterChange: (filter: TodoFilter) => void;
  currentFilter: TodoFilter;
}

export const FooterTodo: React.FC<Props> = (
  { todos, filterChange, currentFilter },
) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          data-cy="FilterLinkAll"
          className={classNames('filter__link',
            {
              selected: currentFilter === TodoFilter.All,
            })}
          onClick={() => filterChange(TodoFilter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link',
            {
              selected: currentFilter === TodoFilter.Active,
            })}
          onClick={() => filterChange(TodoFilter.Active)}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          data-cy="FilterLinkCompleted"
          className={classNames('filter__link',
            {
              selected: currentFilter === TodoFilter.Completed,
            })}
          onClick={() => filterChange(TodoFilter.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
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
