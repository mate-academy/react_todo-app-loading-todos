import classNames from 'classnames';
import { StatusFilter } from '../types/StatusFilter';

type Props = {
  statusFilter: StatusFilter;
  setStatusFilter: React.Dispatch<React.SetStateAction<StatusFilter>>;
};

export const Filter: React.FC<Props> = ({ statusFilter, setStatusFilter }) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: statusFilter === 'all',
        })}
        data-cy="FilterLinkAll"
        onClick={() => setStatusFilter('all')}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: statusFilter === 'active',
        })}
        data-cy="FilterLinkActive"
        onClick={() => setStatusFilter('active')}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: statusFilter === 'completed',
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => setStatusFilter('completed')}
      >
        Completed
      </a>
    </nav>
  );
};
