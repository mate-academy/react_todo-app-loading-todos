import React from 'react';
import classNames from 'classnames';

import { FilterOptions } from '../../types/FilterOptions';

type Props = {
  filterOption: FilterOptions;
  onFilter: (value: FilterOptions) => void;
};

export const Filter: React.FC<Props> = ({ filterOption, onFilter }) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames(
          filterOption === FilterOptions.All
            ? 'filter__link selected'
            : 'filter__link',
        )}
        data-cy="FilterLinkAll"
        onClick={() => onFilter(FilterOptions.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames(
          filterOption === FilterOptions.Active
            ? 'filter__link selected'
            : 'filter__link',
        )}
        data-cy="FilterLinkActive"
        onClick={() => onFilter(FilterOptions.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames(
          filterOption === FilterOptions.Completed
            ? 'filter__link selected'
            : 'filter__link',
        )}
        data-cy="FilterLinkCompleted"
        onClick={() => onFilter(FilterOptions.Completed)}
      >
        Completed
      </a>
    </nav>
  );
};
