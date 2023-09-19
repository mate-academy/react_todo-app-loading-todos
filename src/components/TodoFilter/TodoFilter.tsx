import classNames from 'classnames';
import { TodoStatus } from '../../types';

type Props = {
  selectStatus: (status: TodoStatus) => void;
  status: TodoStatus;
  uncompletedTodos: number;
};

export const TodoFilter: React.FC<Props> = ({
  selectStatus,
  status,
  uncompletedTodos,
}) => (
  <footer className="todoapp__footer">
    <span className="todo-count">
      {`${uncompletedTodos} items left`}
    </span>

    {/* Active filter should have a 'selected' class */}
    <nav className="filter">
      {Object.entries(TodoStatus).map(([key, value]) => (
        <a
          key={key}
          href={`#/${value}`}
          className={classNames(
            'filter__link', {
              selected: value === status,
            },
          )}
          onClick={() => selectStatus(value as TodoStatus)}
        >
          {key}
        </a>
      ))}
    </nav>

    {/* don't show this button if there are no completed todos */}
    <button type="button" className="todoapp__clear-completed">
      Clear completed
    </button>
  </footer>
);
