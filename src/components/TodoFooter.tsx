import classNames from 'classnames';
import { Todo } from '../types/Todo';

export type Status = 'all' | 'active' | 'completed';

type Props = {
  todos: Todo[];
  status: Status;
  setStatus: (status: Status) => void;
};

export const ToDoFooter: React.FC<Props> = ({ todos, setStatus, status }) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todos.length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: status === 'all',
          })}
          onClick={() => setStatus('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: status === 'active',
          })}
          onClick={() => setStatus('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: status === 'completed',
          })}
          onClick={() => setStatus('completed')}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
      //   {classNames({
      //     hidden: completed.length === 0,
      //     todoapp__clear- completed: completed.length > 0,
      // })}
      >
        Clear completed
      </button>
    </footer>
  );
};
