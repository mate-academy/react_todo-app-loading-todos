import classNames from 'classnames';
import { FilterStatus } from '../../types/FilterStatus';
import { Todo } from '../../types/Todo';

type Props = {
  setFilterType: (value: FilterStatus) => void,
  filterType: FilterStatus,
  todos: Todo[],
};

export const Footer: React.FC<Props> = ({
  setFilterType,
  filterType,
  todos,
}) => {
  const todosLeft = todos.filter(todo => !todo.completed).length;
  const todosCompleted = todos.length - todosLeft;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosLeft} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link',
            {
              selected: filterType === FilterStatus.All,
            })}
          onClick={() => setFilterType(FilterStatus.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link',
            {
              selected: filterType === FilterStatus.Active,
            })}
          onClick={() => setFilterType(FilterStatus.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link',
            {
              selected: filterType === FilterStatus.Completed,
            })}
          onClick={() => setFilterType(FilterStatus.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        {todosCompleted > 0 && 'Clear completed'}
      </button>
    </footer>
  );
};
