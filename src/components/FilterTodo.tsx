import React from 'react';
import classNames from 'classnames';
import { Filter } from '../types/Filter';

interface Props {
  filter: Filter,
  setFilter: (filter: Filter) => void,
  filterType: Filter,
  filterLink: string,
}

export const FilterTodo: React.FC<Props> = ({
  filter,
  setFilter,
  filterType,
  filterLink,
}) => (
  <a
    data-cy={filterLink}
    href={`#/${filterType}`}
    className={classNames(
      'filter__link',
      { selected: filter === filterType },
    )}
    onClick={() => setFilter(filterType as Filter)}
  >
    {filterType}
  </a>
);
