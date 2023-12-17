import React from 'react';
import { FilterBy } from '../../types/types';

type Props = {
  getFilter: (arg: FilterBy) => void;
};

const mapGetFilterBy = (filterBy: string): FilterBy => {
  switch (filterBy) {
    case 'completed':
      return FilterBy.Completed;

    case 'active':
      return FilterBy.Active;

    case '':
      return FilterBy.All;

    default:
      return FilterBy.All;
  }
};

export const Filter: React.FC<Props> = ({ getFilter }) => {
  const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const value = e.currentTarget.getAttribute('href')?.replace('#/', '') || '';

    getFilter(mapGetFilterBy(value));
  };

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className="filter__link selected"
        data-cy="FilterLinkAll"
        onClick={handleOnClick}
      >
        All
      </a>

      <a
        href="#/active"
        className="filter__link"
        data-cy="FilterLinkActive"
        onClick={handleOnClick}
      >
        Active
      </a>

      <a
        href="#/completed"
        className="filter__link"
        data-cy="FilterLinkCompleted"
        onClick={handleOnClick}
      >
        Completed
      </a>
    </nav>
  );
};
