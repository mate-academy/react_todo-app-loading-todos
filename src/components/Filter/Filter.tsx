import cn from 'classnames';
import React from 'react';
import { FilterType } from '../../types/FilterType';

type Props = {
  changeFilterStatus: (status: FilterType) => void;
  status: FilterType;
};

export const Filter: React.FC<Props> = ({
  changeFilterStatus, status,
}) => {
  const filterAll = () => changeFilterStatus(FilterType.All);
  const filterActive = () => changeFilterStatus(FilterType.Active);
  const filterCompleted = () => changeFilterStatus(FilterType.Completed);

  return (
    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={cn(
          'filter__link',
          { selected: status === FilterType.All },
        )}
        onClick={filterAll}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className={cn(
          'filter__link',
          { selected: status === FilterType.Active },
        )}
        onClick={filterActive}
      >
        Active
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className={cn(
          'filter__link',
          { selected: status === FilterType.Completed },
        )}
        onClick={filterCompleted}
      >
        Completed
      </a>
    </nav>
  );
};
