import React, { Dispatch, SetStateAction } from 'react';
import cn from 'classnames';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  filterStatus: string;
  setFilterStatus: Dispatch<SetStateAction<FilterStatus>>;
};

export const Filter: React.FC<Props> = ({ filterStatus, setFilterStatus }) => {
  return (
    <>
      {Object.values(FilterStatus).map(status => (
        <nav className="filter" data-cy="Filter" key={status}>
          <a
            href={`#/${status}`}
            className={`filter__link ${cn({
              selected: filterStatus === status,
            })}`}
            data-cy={`FilterLink${status.charAt(0).toUpperCase() + status.slice(1)}`}
            onClick={() => setFilterStatus(status as FilterStatus)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </a>
        </nav>
      ))}
    </>
  );
};
