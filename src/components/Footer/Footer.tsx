import classNames from 'classnames';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  status: Status;
  onChangeStatus: (status: Status) => () => void;
};

export const Footer: React.FC<Props> = ({ todos, status, onChangeStatus }) => {
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: status === Status.all,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onChangeStatus(Status.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: status === Status.active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => onChangeStatus(Status.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: status === Status.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onChangeStatus(Status.completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodosCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
