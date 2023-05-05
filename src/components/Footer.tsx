import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { Select } from '../types/Select';
import { Errors } from '../types/Erorrs';

type Props = {
  countItemLeft: () => number;
  selectedFilter: Select
  setSelectedFilter: (selectedFilter: Select) => void;
  todoList: Todo [] | null;
  setTypeError: (typeError: Errors) => void
  setNotificationError: (notificationError: boolean) => void
};

export const Footer: React.FC<Props> = ({
  countItemLeft,
  selectedFilter,
  setSelectedFilter,
  todoList,
  setTypeError,
  setNotificationError,
}) => {
  const { all, active, completed } = Select;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${countItemLeft()} items left`}
      </span>
      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: selectedFilter === all },
          )}
          onClick={() => {
            setSelectedFilter(all);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: selectedFilter === active },
          )}
          onClick={() => {
            setSelectedFilter(active);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: selectedFilter === completed },
          )}
          onClick={() => {
            setSelectedFilter(completed);
          }}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        onClick={() => {
          setTypeError(Errors.REMOVE);
          setNotificationError(true);
        }}
        className={classNames(
          'todoapp__clear-completed',
          {
            'is-invisible': (!todoList?.find(todo => todo.completed)),
          },
        )}
      >
        Clear completed
      </button>

    </footer>
  );
};
