import React from 'react';
import classNames from 'classnames';
import { SORT } from '../../types/SornEnum';

type Props = {
  updateSortField: (term: SORT) => void;
  sortField: SORT;
};

export const TodosFilter: React.FC<Props> = ({
  updateSortField,
  sortField,
}) => {
  return (
    <nav className="filter">
      <a
        href="#/"
        className={classNames({
          filter__link: true,
          selected: sortField === SORT.ALL,
        })}
        onClick={() => updateSortField(SORT.ALL)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames({
          filter__link: true,
          selected: sortField === SORT.ACTIVE,
        })}
        onClick={() => updateSortField(SORT.ACTIVE)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames({
          filter__link: true,
          selected: sortField === SORT.COMPLETED,
        })}
        onClick={() => updateSortField(SORT.COMPLETED)}
      >
        Completed
      </a>
    </nav>
  );
};
