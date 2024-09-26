import React from 'react';
import { FilterOptions } from '../types/FilterOptions';
import classNames from 'classnames';

type Props = {
  filter: FilterOptions;
  setFilter: (filter: FilterOptions) => void;
};

export const Filter: React.FC<Props> = ({ filter, setFilter }) => {
  const filterOptionsArray = Object.values(FilterOptions);

  return (
    <nav className="filter" data-cy="Filter">
      {filterOptionsArray.map(option => (
        <a
          key={option}
          href="#/"
          className={classNames('filter__link', {
            selected: filter === option,
          })}
          data-cy={`FilterLink${option}`}
          onClick={() => setFilter(option)}
        >
          {option}
        </a>
      ))}
    </nav>
  );
};
