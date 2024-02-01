import cn from 'classnames';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

type Props = {
  filterBy: Status;
  setFilter: (filter: Status) => void;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({ filterBy, setFilter, todos }) => {
  const numberActiveTodos = todos.filter((todo) => !todo.completed).length;
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {numberActiveTodos}
        {' '}
        items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filterBy === Status.All })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn(
            'filter__link', { selected: filterBy === Status.Active },
          )}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(Status.Active)}

        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn(
            'filter__link', { selected: filterBy === Status.Completed },
          )}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      {completedTodos.length > 0 && (
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
