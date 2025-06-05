import { useState } from 'react';
import { FilterType } from '../../types/Filter';

interface FilterProps {
  setFilterStyle: (style: FilterType) => void;
}

export const Filter: React.FC<FilterProps> = ({ setFilterStyle }) => {
  const [activeStyle, setActiveStyle] = useState('all');

  const handleFilterLink = (style: FilterType) => {
    setActiveStyle(style);
    setFilterStyle(style);
  };

  return (
    /* Active link should have the 'selected' class */
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={`filter__link ${activeStyle === 'all' ? 'selected' : ''}`}
        data-cy="FilterLinkAll"
        onClick={() => handleFilterLink('all')}
      >
        All
      </a>

      <a
        href="#/active"
        className={`filter__link ${activeStyle === 'active' ? 'selected' : ''}`}
        data-cy="FilterLinkActive"
        onClick={() => handleFilterLink('active')}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={`filter__link ${activeStyle === 'completed' ? 'selected' : ''}`}
        data-cy="FilterLinkCompleted"
        onClick={() => handleFilterLink('completed')}
      >
        Completed
      </a>
    </nav>
  );
};
