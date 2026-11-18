import { Filter, filterNames } from '../types/Filter';
import classNames from 'classnames';

type Props = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
};

export default function TodoFilter({ filter, onFilterChange }: Props) {
  return (
    <nav className="filter" data-cy="Filter">
      {Object.values(Filter).map(filterValue => (
        <a
          key={filterValue}
          href={`#/${filterValue}`}
          data-cy={`FilterLink${filterNames[filterValue]}`}
          className={classNames('filter__link', {
            selected: filter === filterValue,
          })}
          onClick={() => onFilterChange(filterValue)}
        >
          {filterNames[filterValue]}
        </a>
      ))}
    </nav>
  );
}
