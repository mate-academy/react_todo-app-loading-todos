import classNames from 'classnames';
import { FilterBy } from '../../enums/FilterBy';

type Props = {
  filter: FilterBy;
  setFilter: (newFilter: FilterBy) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  setFilter,
}) => (
  <nav className="filter">
    <a
      href="#/"
      className={classNames('filter__link', {
        selected: filter === FilterBy.All,
      })}
      onClick={() => setFilter(FilterBy.All)}
    >
      All
    </a>

    <a
      href="#/active"
      className={classNames('filter__link', {
        selected: filter === FilterBy.Active,
      })}
      onClick={() => setFilter(FilterBy.Active)}
    >
      Active
    </a>

    <a
      href="#/completed"
      className={classNames('filter__link', {
        selected: filter === FilterBy.Completed,
      })}
      onClick={() => setFilter(FilterBy.Completed)}
    >
      Completed
    </a>
  </nav>
);
