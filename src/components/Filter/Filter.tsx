import React from 'react';

interface Props {
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

export const Filter: React.FC<Props> = ({ filter, setFilter }) => (
  <nav className="filter" data-cy="Filter">
    {['all', 'active', 'completed'].map(status => (
      <a
        key={status}
        href={`#/${status}`}
        className={`filter__link ${filter === status ? 'selected' : ''}`}
        data-cy={`FilterLink${status.charAt(0).toUpperCase() + status.slice(1)}`}
        onClick={() => setFilter(status as 'all' | 'active' | 'completed')}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </a>
    ))}
  </nav>
);
