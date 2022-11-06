import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { FilterType } from '../../types/Filters';

interface Props {
  todos: Todo[] | null;
  statusFilter: string;
  setStatusFilter: (event: string) => void;
}

export const TodoFillter: React.FC<Props> = ({
  todos,
  setStatusFilter,
}) => {
  const findTodoCompleted = todos?.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {todos && (
          `${todos.length} items left`
        )}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            { 'filter__link selected': FilterType.All },
          )}
          onClick={() => setStatusFilter(FilterType.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            { 'filter__link selected': FilterType.Active },
          )}
          onClick={() => setStatusFilter(FilterType.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            { 'filter__link selected': FilterType.Completed },
          )}
          onClick={() => setStatusFilter(FilterType.Completed)}
        >
          Completed
        </a>
      </nav>
      <div>
        {findTodoCompleted && (
          <button
            data-cy="ClearCompletedButton"
            type="button"
            className="todoapp__clear-completed"
          >
            Clear completed
          </button>
        )}
      </div>

    </footer>

  );
};
