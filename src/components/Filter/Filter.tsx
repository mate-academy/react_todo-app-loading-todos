import React, { memo } from 'react';
import cn from 'classnames';

import { StatusFilter } from '../../types/StatusFilter';

type Props = {
  statusFilter: StatusFilter;
  onChangeStatusFilter: React.Dispatch<React.SetStateAction<StatusFilter>>;
};

export const Filter: React.FC<Props> = memo((props) => {
  const { statusFilter, onChangeStatusFilter } = props;

  return (
    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={cn('filter__link', {
          selected: statusFilter === StatusFilter.All,
        })}
        onClick={() => onChangeStatusFilter(StatusFilter.All)}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className={cn('filter__link', {
          selected: statusFilter === StatusFilter.Active,
        })}
        onClick={() => onChangeStatusFilter(StatusFilter.Active)}
      >
        Active
      </a>

      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className={cn('filter__link', {
          selected: statusFilter === StatusFilter.Completed,
        })}
        onClick={() => onChangeStatusFilter(StatusFilter.Completed)}
      >
        Completed
      </a>
    </nav>
  );
});
