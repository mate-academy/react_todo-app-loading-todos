import classNames from 'classnames';
import { FilterStatus } from '../../types/FilterStatus';
import { Todo } from '../../types/Todo';
import { countTodos } from '../../utils/counterTodos';

type Props = {
  todos: Todo[],
  selectedFilter: string,
  onSelectedFilter: (val: FilterStatus) => void,
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  selectedFilter,
  onSelectedFilter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${countTodos(todos, false)} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link', {
            selected: selectedFilter === FilterStatus.All,
          })}
          onClick={() => onSelectedFilter(FilterStatus.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link', {
            selected: selectedFilter === FilterStatus.Active,
          })}
          onClick={() => onSelectedFilter(FilterStatus.Active)}
        >
          Active
        </a>

        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link', {
            selected: selectedFilter === FilterStatus.Completed,
          })}
          onClick={() => onSelectedFilter(FilterStatus.Completed)}
        >
          Completed
        </a>
      </nav>

      {countTodos(todos, true) && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
