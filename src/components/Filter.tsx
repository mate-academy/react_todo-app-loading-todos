import React from 'react';
import { Status } from '../types/Status';

interface FilterProps {
  status: Status;
  onStatusChange: (status: Status) => void;
}

const Filter: React.FC<FilterProps> = ({ status, onStatusChange }) => {
  return (
    <nav className="filter" data-cy="Filter">
      {Object.values(Status).map(value => (
        <a
          key={value}
          href={`#${value}`}
          className={`filter__link ${status === value ? 'selected' : ''}`}
          onClick={() => onStatusChange(value)}
          data-cy={`FilterLink${value}`}
        >
          {value}
        </a>
      ))}
    </nav>
  );
};

export default Filter;
