import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';

type Props = {
  filterType: FilterType;
  todos: Todo[];
  setFilterType: (filterType: FilterType) => void;
};

export const Footer: React.FC<Props> = ({
  filterType,
  todos,
  setFilterType,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterType === FilterType.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterType(FilterType.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterType === FilterType.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterType(FilterType.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterType === FilterType.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterType(FilterType.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.filter(todo => todo.completed).length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
