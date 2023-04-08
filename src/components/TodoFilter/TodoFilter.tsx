import { FC } from 'react';
import classNames from 'classnames';
import { FilterType } from '../../types/FilterType';

type Props = {
  filterType: FilterType,
  onFilterChange: (filter: FilterType) => void,
};

export const TodoFilter: FC<Props> = (props) => {
  const {
    filterType,
    onFilterChange,
  } = props;

  return (
    <nav className="filter">
      {Object.values(FilterType).map((filterName) => {
        const filterNameLowerCase = filterName.toLowerCase();
        const isCurFilterName = filterName === filterType;

        return (
          <a
            key={filterName}
            href={`#/${filterNameLowerCase}`}
            className={classNames(
              'filter__link',
              { selected: isCurFilterName },
            )}
            onClick={() => onFilterChange(filterName)}
          >
            {filterName}
          </a>
        );
      })}
    </nav>
  );
};
