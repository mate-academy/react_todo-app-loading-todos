import { Status } from '../../types/statusTypes';
import { Todo } from '../../types/Todo';
import pluralize from 'pluralize';
import cn from 'classnames';

interface Props {
  todos: Todo[];
  selectedStatus: Status;
  setSelectedStatus: (status: Status) => void;
}

export const Footer: React.FC<Props> = ({
  todos,
  selectedStatus,
  setSelectedStatus,
}) => {
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosCount} ${pluralize('item', activeTodosCount)} left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: selectedStatus === Status.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setSelectedStatus(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: selectedStatus === Status.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setSelectedStatus(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: selectedStatus === Status.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setSelectedStatus(Status.Completed)}
        >
          Completed
        </a>
      </nav>

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
