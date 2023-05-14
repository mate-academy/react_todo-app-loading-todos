import cn from 'classnames';
import { useContext } from 'react';
import { FilterType } from '../../types/FilterType';
import { FilterContext } from '../../contexts/FilterContext';

export const Filter: React.FC = () => {
  const { filter: filterType, setFilter } = useContext(FilterContext);

  return (
    <nav className="filter">
      {Object.values(FilterType).map(filter => (
        <a
          key={filter}
          href={`#/${filter === FilterType.All
            ? ''
            : filter[0].toLowerCase() + filter.slice(1)}`}
          className={cn('filter__link',
            { selected: filterType === filter })}
          onClick={() => setFilter(filter)}
        >
          {filter}
        </a>
      ))}
    </nav>
  );
};
