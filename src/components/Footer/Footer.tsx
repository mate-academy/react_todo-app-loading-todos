import classnames from 'classnames';
import { FilterStatus } from '../../types/Filter';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  filterType: string;
  handleFilterStatus: (type: string) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  filterType,
  handleFilterStatus,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classnames(
            'filter__link',
            { selected: filterType === FilterStatus.All },
          )}
          onClick={() => handleFilterStatus(FilterStatus.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classnames(
            'filter__link',
            { selected: filterType === FilterStatus.Active },
          )}
          onClick={() => handleFilterStatus(FilterStatus.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classnames(
            'filter__link',
            { selected: filterType === FilterStatus.Completed },
          )}
          onClick={() => handleFilterStatus(FilterStatus.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
