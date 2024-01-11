import { useState } from 'react';
import classNames from 'classnames';
import { filterOptions } from '../types/FilterOptions';

type Props = {
  changeFilter: React.Dispatch<React.SetStateAction<filterOptions>>
};

export const TodoFilter: React.FC<Props> = ({ changeFilter }) => {
  /* Active filter should have a 'selected' class */
  const [filter, setFilter] = useState(filterOptions.All);
  const handelFilterChange = (field: filterOptions) => {
    setFilter(field);
    changeFilter(field);
  };

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          'filter__link selected': filter === filterOptions.All,
        })}
        data-cy="FilterLinkAll"
        onClick={() => handelFilterChange(filterOptions.All)}
      >
        {filterOptions.All}
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          'filter__link selected': filter === filterOptions.Active,
        })}
        data-cy="FilterLinkActive"
        onClick={() => handelFilterChange(filterOptions.Active)}
      >
        {filterOptions.Active}
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          'filter__link selected': filter === filterOptions.Completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => handelFilterChange(filterOptions.Completed)}
      >
        {filterOptions.Completed}
      </a>
    </nav>
  );
};
