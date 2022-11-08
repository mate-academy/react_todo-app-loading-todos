import classNames from 'classnames';
import { GroupBy } from '../../types/GroupBy';
import { Todo } from '../../types/Todo';

type Props = {
  groupBy: GroupBy
  setGroupBy: (status: GroupBy) => void
  todos: Todo[]
};

export const Footer: React.FC<Props> = ({
  groupBy,
  setGroupBy,
  todos,
}) => {
  const completedCount = todos.filter(({ completed }) => !completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${completedCount} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link', {
            selected: groupBy === GroupBy.ALL,
          })}
          onClick={() => setGroupBy(GroupBy.ALL)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link', {
            selected: groupBy === GroupBy.ACTIVE,
          })}
          onClick={() => setGroupBy(GroupBy.ACTIVE)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link', {
            selected: groupBy === GroupBy.COMPLETED,
          })}
          onClick={() => setGroupBy(GroupBy.COMPLETED)}
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
