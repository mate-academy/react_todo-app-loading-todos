import cn from 'classnames';
import { FilterType } from '../types/Filter';

type Props = {
  filter: FilterType;
  onFilterChange: (
    event: React.MouseEvent<HTMLAnchorElement>,
    newFilter: FilterType,
  ) => void;
};

export const Filter: React.FC<Props> = ({ filter, onFilterChange }) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={cn('filter__link', { selected: filter === FilterType.All })}
        data-cy="FilterLinkAll"
        onClick={event => onFilterChange(event, FilterType.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', {
          selected: filter === FilterType.Active,
        })}
        data-cy="FilterLinkActive"
        onClick={event => onFilterChange(event, FilterType.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: filter === FilterType.Completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={event => onFilterChange(event, FilterType.Completed)}
      >
        Completed
      </a>
    </nav>
  );
};
