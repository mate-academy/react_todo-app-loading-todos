import cn from 'classnames';
import { Status } from '../types/Status';
import React from 'react';

type Props = {
  filterStatus: Status;
  setFilterStatus: (filterStatus: Status) => void;
};

const filterTitles = {
  [Status.All]: 'All',
  [Status.Active]: 'Active',
  [Status.Completed]: 'Completed',
};

export const Filter: React.FC<Props> = ({ filterStatus, setFilterStatus }) => (
  <nav className="filter" data-cy="Filter">
    {Object.values(Status).map(status => (
      <a
        key={status}
        href="#/"
        className={cn('filter__link', { selected: filterStatus === status })}
        data-cy={`FilterLink${filterTitles[status]}`}
        onClick={() => setFilterStatus(status)}
      >
        {status}
      </a>
    ))}
  </nav>
);
