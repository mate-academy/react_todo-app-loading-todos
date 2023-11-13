import React, { useContext, useState } from 'react';
import cn from 'classnames';

import './FilterTodo.scss';

import { DispatchContext, actionCreator } from '../../../TodoStore';
import { Filter } from '../../../../types/Filter';

export const FilterTodo: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const [currentFilter, setCurrentFilter] = useState(Filter.All);

  const handleFilter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const filter = (event.target as HTMLAnchorElement).innerText as Filter;

    setCurrentFilter(filter);
    dispatch(actionCreator.filter(filter));
  };

  return (
    <nav className="filter" data-cy="Filter">
      {Object.values(Filter).map(filter => (
        <a
          key={filter}
          href={`#/${filter}`}
          className={cn('filter__link', {
            selected: currentFilter === filter,
          })}
          data-cy={`FilterLink${filter}`}
          onClick={handleFilter}
        >
          {filter}
        </a>
      ))}
    </nav>
  );
};
