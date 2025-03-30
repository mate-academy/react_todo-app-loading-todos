import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { FilterBy } from '../types/FilterBy';

type Proto = {
  todos: Todo[];
  statusFilterTodo: FilterBy;
  setStatusFilterTodo: (filter: FilterBy) => void;
  handleClearTodo: () => void;
};

export const TodoFooter: React.FC<Proto> = ({
  todos,
  statusFilterTodo,
  setStatusFilterTodo,
  handleClearTodo,
}) => {
  if (todos.length === 0) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: statusFilterTodo === FilterBy.All,
          })}
          data-cy="FilterLinkAll"
          onClick={event => {
            event.preventDefault();
            setStatusFilterTodo(FilterBy.All);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: statusFilterTodo === FilterBy.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={event => {
            event.preventDefault();
            setStatusFilterTodo(FilterBy.Active);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: statusFilterTodo === FilterBy.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={event => {
            event.preventDefault();
            setStatusFilterTodo(FilterBy.Completed);
          }}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearTodo}
        disabled={!todos.some(todo => todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
