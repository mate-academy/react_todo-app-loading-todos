import classNames from 'classnames';
import { FilterStatus } from '../../types/FilterStatus';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setFilterType: (value: FilterStatus) => void,
  filterType: FilterStatus,
};

export const TodosFilter: React.FC<Props> = ({
  todos,
  setFilterType,
  filterType,
}) => {
  const todosLeft = todos.filter(todo => !todo.completed).length;
  const todosComleted = todos.length - todosLeft;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosLeft} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          onClick={() => setFilterType(FilterStatus.All)}
          className={classNames(
            'filter__link',
            {
              selected: filterType === FilterStatus.All,
            },
          )}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          onClick={() => setFilterType(FilterStatus.Active)}
          className={classNames(
            'filter__link',
            {
              selected: filterType === FilterStatus.Active,
            },
          )}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          onClick={() => setFilterType(FilterStatus.Completed)}
          className={classNames(
            'filter__link',
            {
              selected: filterType === FilterStatus.Completed,
            },
          )}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        {(todosComleted > 0) && 'Clear completed'}
      </button>
    </footer>
  );
};
