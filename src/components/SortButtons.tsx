import React from 'react';
import { SortField } from '../types/SortTypes';
import classNames from 'classnames';

type Props = {
  sortBy: (sortField: SortField) => void;
  currentSortField: SortField;
};

export const SortButtons: React.FC<Props> = ({ sortBy, currentSortField }) => {
  return (
    <div>
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: currentSortField === SortField.All,
        })}
        data-cy="FilterLinkAll"
        onClick={() => sortBy(SortField.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: currentSortField === SortField.Active,
        })}
        data-cy="FilterLinkActive"
        onClick={() => sortBy(SortField.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: currentSortField === SortField.Completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => sortBy(SortField.Completed)}
      >
        Completed
      </a>
    </div>
  );
};
