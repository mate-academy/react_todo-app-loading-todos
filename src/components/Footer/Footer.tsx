import cN from 'classnames';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  setFilterStatus: (status: FilterStatus) => void,
  filterStatus: string,
};

export const Footer: React.FC<Props> = ({ setFilterStatus, filterStatus }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        4 items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={cN('filter__link',
            { selected: filterStatus === FilterStatus.All })}
          onClick={() => {
            setFilterStatus(FilterStatus.All);
          }}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={cN('filter__link',
            { selected: filterStatus === FilterStatus.Active })}
          onClick={() => {
            setFilterStatus(FilterStatus.Active);
          }}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={cN('filter__link',
            { selected: filterStatus === FilterStatus.Completed })}
          onClick={() => {
            setFilterStatus(FilterStatus.Completed);
          }}
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
