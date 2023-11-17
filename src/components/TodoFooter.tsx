import cn from 'classnames';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  filter: Status;
  setFilter: (filter: Status) => void;
};

export const TodoFooter: React.FC<Props> = ({ todos, filter, setFilter }) => {
  const activeTodoCount = todos.filter(todo => !todo.completed).length;
  const activeTodoCountMsg = activeTodoCount === 1
    ? ('1 item left')
    : (`${activeTodoCount} items left`);

  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodoCountMsg}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={
            cn('filter__link', { selected: filter === Status.All })
          }
          data-cy="FilterLinkAll"
          onClick={() => setFilter(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={
            cn('filter__link', { selected: filter === Status.Active })
          }
          data-cy="FilterLinkActive"
          onClick={() => setFilter(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={
            cn('filter__link', { selected: filter === Status.Completed })
          }
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      {hasCompletedTodos && (
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
