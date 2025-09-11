import React from 'react';
import classNames from 'classnames';
import { FilterType } from '../types/Todo';

type Props = {
  filterType: string;
  onFilterClick: (type: FilterType) => void;
};

export const Filter: React.FC<Props> = ({ filterType, onFilterClick }) => {
  return (
    <>
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterType === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => onFilterClick('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterType === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => onFilterClick('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterType === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilterClick('completed')}
        >
          Completed
        </a>
      </nav>
    </>
  );
};
