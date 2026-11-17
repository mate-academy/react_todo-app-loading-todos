import { Filter } from '../types/Filter';
import classNames from 'classnames';

type Props = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export default function TodoFilter({ filter, setFilter }: Props) {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filter === Filter.ALL,
        })}
        data-cy="FilterLinkAll"
        onClick={() => setFilter(Filter.ALL)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filter === Filter.ACTIVE,
        })}
        data-cy="FilterLinkActive"
        onClick={() => setFilter(Filter.ACTIVE)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filter === Filter.COMPLETED,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => setFilter(Filter.COMPLETED)}
      >
        Completed
      </a>
    </nav>
  );
}
