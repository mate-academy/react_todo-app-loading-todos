import classNames from 'classnames';
import { FilterValue } from '../utils/FilterValue';

type Props = {
  setFilterValue: (filterValue: FilterValue) => void;
  filterValue: string;
};

export const TodoFilter = ({ setFilterValue, filterValue }: Props) => {
  return (
    <nav className="filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filterValue === FilterValue.AllItems,
        })}
        onClick={() => setFilterValue(FilterValue.AllItems)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filterValue === FilterValue.Active,
        })}
        onClick={() => setFilterValue(FilterValue.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filterValue === FilterValue.Completed,
        })}
        onClick={() => setFilterValue(FilterValue.Completed)}
      >
        Completed
      </a>
    </nav>
  );
};
