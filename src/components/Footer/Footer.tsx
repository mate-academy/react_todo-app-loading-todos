import { FilterStatus } from '../../types/Filterstatus';
import { Todo } from '../../types/Todo';

type Props = {
  completedTodos: Todo[] | [],
  onStatusChange: (str: FilterStatus) => void,
};

export const Footer: React.FC<Props> = ({
  completedTodos,
  onStatusChange,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        4 items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className="filter__link selected"
          onClick={() => onStatusChange(FilterStatus.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className="filter__link"
          onClick={() => onStatusChange(FilterStatus.Active)}
        >
          Active
        </a>

        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className="filter__link"
          onClick={() => onStatusChange(FilterStatus.Completed)}
        >
          Completed
        </a>

      </nav>

      {completedTodos.length > 0 && (
        <button
          data-cy="ClearCompletedButton"
          type="button"
          className="todoapp__clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
