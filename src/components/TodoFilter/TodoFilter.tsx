import classNames from 'classnames';
import { FilteredBy } from '../../types/FilteredBy';

type Props = {
  filter: FilteredBy;
  setFilter: (newFilter: FilteredBy) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  setFilter,
}) => (
  <nav className="filter">
    <a
      href="#/"
      className={classNames('filter__link', {
        selected: filter === FilteredBy.ALL,
      })}
      onClick={() => setFilter(FilteredBy.ALL)}
    >
      All
    </a>

    <a
      href="#/active"
      className={classNames('filter__link', {
        selected: filter === FilteredBy.ACTIVE,
      })}
      onClick={() => setFilter(FilteredBy.ACTIVE)}
    >
      Active
    </a>

    <a
      href="#/completed"
      className={classNames('filter__link', {
        selected: filter === FilteredBy.COMPLETED,
      })}
      onClick={() => setFilter(FilteredBy.COMPLETED)}
    >
      Completed
    </a>
  </nav>
);
