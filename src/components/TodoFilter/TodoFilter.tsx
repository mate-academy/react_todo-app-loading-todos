import { Filter } from '../../types/Filter';
import cn from 'classnames';

type Props = {
  setFilter: (elem: Filter) => void;
  filter: Filter;
};

export const TodoFilter: React.FC<Props> = ({ setFilter, filter }) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={cn('filter__link', {
          selected: Filter.all === filter,
        })}
        data-cy="FilterLinkAll"
        onClick={() => setFilter(Filter.all)}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', {
          selected: Filter.active === filter,
        })}
        data-cy="FilterLinkActive"
        onClick={() => setFilter(Filter.active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: Filter.completed === filter,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => setFilter(Filter.completed)}
      >
        Completed
      </a>
    </nav>
  );
};
