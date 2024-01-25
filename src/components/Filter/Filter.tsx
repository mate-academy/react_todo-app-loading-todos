import cn from 'classnames';
import { FilterItem } from '../../types/FilterItem';

type Props = {
  setFilter: (value: FilterItem) => void,
  filter: string,
};

export const Filter: React.FC<Props> = ({ setFilter, filter }) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={cn('filter__link', {
          selected: filter === 'all',
        })}
        data-cy="FilterLinkAll"
        onClick={() => setFilter(FilterItem.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', {
          selected: filter === 'active',
        })}
        data-cy="FilterLinkActive"
        onClick={() => setFilter(FilterItem.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: filter === 'completed',
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => setFilter(FilterItem.Completed)}
      >
        Completed
      </a>
    </nav>
  );
};
