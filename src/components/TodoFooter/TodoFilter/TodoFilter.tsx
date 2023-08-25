import classNames from 'classnames';
import { useState } from 'react';
import { Filter } from '../../../types/Filter';

type Props = {
  changeQuery: (query: string) => void,
};

const FILTER_MODE = [Filter.all, Filter.active, Filter.completed];

export const TodoFilter: React.FC<Props> = ({
  changeQuery,
}) => {
  const [filterMode, setFilterMode] = useState(Filter.all);

  const handleSetFilter = (filter: Filter) => {
    changeQuery(Filter[filter]);
    setFilterMode(Filter[filter]);
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <ul className="filter">
      {FILTER_MODE.map(currentFilter => {
        const textFilter = capitalizeFirstLetter(currentFilter);

        return (
          <li>
            <a
              href={`#${currentFilter === Filter.all ? '/' : `/${currentFilter}`}`}
              onClick={() => handleSetFilter(Filter[currentFilter])}
              className={classNames('filter__link', {
                selected: (filterMode === Filter[currentFilter]),
              })}
            >
              {textFilter}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
