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
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {`${uncompletedTodos} items left`}
    </span>

    <nav className="filter" data-cy="Filter">
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
          data-cy={`FilterLink${key}`}
        >
          {key}
        </a>
      ))}
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
