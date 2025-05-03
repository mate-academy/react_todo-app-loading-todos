import classNames from 'classnames';
import { FilterStatus } from '../../enums/enums';

type Props = {
  todosCompleted: number;
  todosActive: number;
  statusValue: FilterStatus;
  handleStatusValueChange: (statusValue: FilterStatus) => void;
};

export const Footer: React.FC<Props> = ({
  todosCompleted,
  todosActive,
  statusValue,
  handleStatusValueChange,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todosActive} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: statusValue === FilterStatus.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleStatusValueChange(FilterStatus.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: statusValue === FilterStatus.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleStatusValueChange(FilterStatus.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: statusValue === FilterStatus.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleStatusValueChange(FilterStatus.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todosCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
