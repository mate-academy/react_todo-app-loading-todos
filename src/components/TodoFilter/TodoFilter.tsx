import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { StatusTodos } from '../../types/StatusTodo';

type Props = {
  visibleTodos: Todo[];
  status: string,
  onStatusChanges: (value: StatusTodos) => void;
};

export const TodoFilter: React.FC<Props> = ({
  visibleTodos,
  status,
  onStatusChanges,
}) => {
  const activeTodos = visibleTodos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodos} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: status === StatusTodos.ALL,
          })}
          onClick={() => onStatusChanges(StatusTodos.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: status === StatusTodos.ACTIVE,
          })}
          onClick={() => onStatusChanges(StatusTodos.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: status === StatusTodos.COMPLETED,
          })}
          onClick={() => onStatusChanges(StatusTodos.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
