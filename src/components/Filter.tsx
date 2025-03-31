import React from 'react';
import { FilterType } from '../types/FilterType';
import classNames from 'classnames';

type Props = {
  selected: FilterType;
  onSelect: (filter: FilterType) => void;
};

export const Filter: React.FC<Props> = ({ selected, onSelect }) => {
  const handleSelect = (type: FilterType) => () => {
    onSelect(type);
  };

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: selected === FilterType.all,
        })}
        data-cy="FilterLinkAll"
        onClick={handleSelect(FilterType.all)}
      >
        {FilterType.all}
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: selected === FilterType.active,
        })}
        data-cy="FilterLinkActive"
        onClick={handleSelect(FilterType.active)}
      >
        {FilterType.active}
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: selected === FilterType.completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={handleSelect(FilterType.completed)}
      >
        {FilterType.completed}
      </a>
    </nav>
  );
};
