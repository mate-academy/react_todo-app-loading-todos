import classNames from 'classnames';
import { FilteredTodos } from '../enums/FilteredTodos';
import React from 'react';

interface Props {
  setFilterSelected: (filterSelected: FilteredTodos) => void;
  filterSelected: FilteredTodos;
}

export const TodoFilter: React.FC<Props> = ({
  setFilterSelected,
  filterSelected,
}) => {
  const filters = Object.values(FilteredTodos);

  return (
    <nav className="filter" data-cy="Filter">
      {filters.map((filter) => (
        <a
          key={filter}
          href="#/"
          className={classNames('filter__link', {
            selected: filterSelected === filter,
          })}
          onClick={() => setFilterSelected(filter)}
          data-cy={`FilterLink${filter}`}
        >
          {filter}
        </a>
      ))}
    </nav>
  );
};
