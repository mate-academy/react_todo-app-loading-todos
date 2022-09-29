import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  setFilterType: (filterType: string) => void;
  filterType: string;
};

export const TodoFilter: React.FC<Props> = ({
  todos, filterType, setFilterType,
}) => {
  const { length } = todos.filter((todo) => todo.completed === false);

  const completedTodos = todos.some((todo) => todo.completed === true);

  const handleAllSort = () => setFilterType('All');
  const handleActiveSort = () => setFilterType('Active');
  const handleCompletedSort = () => setFilterType('Completed');

  return (
    <>
      <span className="todo-count" data-cy="todosCounter">
        {`${length} items left`}
      </span>
      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filterType === 'All' },
          )}
          onClick={handleAllSort}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filterType === 'Active' },
          )}
          onClick={handleActiveSort}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filterType === 'Completed' },
          )}
          onClick={handleCompletedSort}
        >
          Completed
        </a>
      </nav>
      {completedTodos
        ? (
          <button
            data-cy="ClearCompletedButton"
            type="button"
            className="todoapp__clear-completed"
          >
            Clear completed
          </button>
        )
        : (
          <button
            data-cy="ClearCompletedButton"
            type="button"
            className="todoapp__clear-completed"
            style={{ visibility: 'hidden' }}
          >
            Clear completed
          </button>
        )}

    </>
  );
};
