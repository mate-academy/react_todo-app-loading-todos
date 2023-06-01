import classNames from 'classnames';
import { FilterType } from '../../types/FilterType';

interface FilterProps {
  filter: string,
  filterSelected: (filter: FilterType) => void,

}

export const Filter: React.FC<FilterProps> = ({
  filter,
  filterSelected,
}) => {
  return (
    <nav className="filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filter === FilterType.Completed,
        })}
        onClick={() => filterSelected(FilterType.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filter === FilterType.Completed,
        })}
        onClick={() => filterSelected(FilterType.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filter === FilterType.Completed,
        })}
        onClick={() => filterSelected(FilterType.Completed)}
      >
        Completed
      </a>
    </nav>
  );
};
