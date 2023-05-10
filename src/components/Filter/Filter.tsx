import cn from 'classnames';
import { FilterType } from '../../types/FilterType';

interface Props {
  currentFilterType: FilterType;
  setFilterType: (filter: FilterType) => void;
}

export const Filter: React.FC<Props> = ({
  currentFilterType,
  setFilterType,
}) => {
  return (
    <nav className="filter">
      {Object.values(FilterType).map(filter => (
        <a
          key={filter}
          href={`#/${filter === FilterType.All
            ? ''
            : filter[0].toLowerCase() + filter.slice(1)}`}
          className={cn('filter__link',
            { selected: currentFilterType === filter })}
          onClick={() => setFilterType(filter)}
        >
          {filter}
        </a>
      ))}
    </nav>
  );
};
