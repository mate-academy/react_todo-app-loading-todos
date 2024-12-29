import classNames from 'classnames';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  setFilterStatus: (link: FilterStatus) => void;
  filterStatus: FilterStatus;
  todosActiveQuantity: number;
};

export const Footer: React.FC<Props> = ({
  setFilterStatus,
  filterStatus,
  todosActiveQuantity,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosActiveQuantity} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          // className="filter__link selected"
          className={classNames('filter__link', {
            selected: filterStatus === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterStatus('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterStatus === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterStatus('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterStatus === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterStatus('completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
