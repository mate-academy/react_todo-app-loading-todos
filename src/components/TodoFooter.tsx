import classNames from 'classnames';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
  status: Status,
  setStatus: (status: Status) => void;
};

export const TodoFooter: React.FC<Props> = (
  {
    todos,
    setTodos,
    status,
    setStatus,
  },
) => {
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  const handleCompletedTodos = () => {
    const filteredTodos = todos.filter(todo => !todo.completed);

    setTodos(filteredTodos);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodosCount} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: status === Status.all,
          })}
          onClick={() => setStatus(Status.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: status === Status.active,
          })}
          onClick={() => setStatus(Status.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: status === Status.completed,
          })}
          onClick={() => setStatus(Status.completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className={classNames('todoapp__clear-completed', {
          hidden: completedTodosCount === 0,
        })}
        onClick={handleCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
