import classNames from 'classnames';
import { Todo } from '../types/Todo';
import EFilter from '../utils/EFilter';

interface ITodoFooter {
  todos: Todo[] | undefined;
  filter: EFilter;
  setFilter: (filter: EFilter) => void;
}

export const TodoFooter: React.FC<ITodoFooter> = ({
  todos,
  filter,
  setFilter,
}) => {
  const todosCounter = todos?.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosCounter} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === EFilter.all,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(EFilter.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === EFilter.active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(EFilter.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === EFilter.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(EFilter.completed)}
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
