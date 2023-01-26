import cn from 'classnames';
import { FilterStatus } from '../../types/Filter';

type Props = {
  setFilterStatus: React.Dispatch<React.SetStateAction<FilterStatus>>,
  filterStatus: string,
};

export const Filter: React.FC<Props> = ({ setFilterStatus, filterStatus }) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        // className="filter__link selected"
        className={cn(
          'filter__link',
          { selected: filterStatus === FilterStatus.All },
        )}
        onClick={() => setFilterStatus(FilterStatus.All)}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className={cn(
          'filter__link',
          { selected: filterStatus === FilterStatus.Active },
        )}
        onClick={() => setFilterStatus(FilterStatus.Active)}
      >
        Active
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className={cn('filter__link', {
          selected: filterStatus === FilterStatus.Completed,
        })}
        onClick={() => setFilterStatus(FilterStatus.Completed)}
      >
        Completed
      </a>
    </nav>
  );
};
