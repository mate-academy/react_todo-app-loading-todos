import React from 'react';
import classNames from 'classnames';
import { Filter } from '../../types/Filter';

interface Props {
  filterBy: Filter;
  setFilterBy: (filter: Filter) => void;
}

export const TodoFilter: React.FC<Props> = ({ filterBy, setFilterBy }) => (
  <nav className="filter">
    <a
      href="#/"
      className={classNames('filter__link',
        { selected: filterBy === Filter.All })}
      onClick={(event) => {
        event.preventDefault();
        setFilterBy(Filter.All);
      }}
    >
      All
    </a>

    <a
      href="#/active"
      className={classNames('filter__link',
        { selected: filterBy === Filter.Active })}
      onClick={(event) => {
        event.preventDefault();
        setFilterBy(Filter.Active);
      }}
    >
      {Filter.Active}
    </a>

    <a
      href="#/completed"
      className={classNames('filter__link',
        { selected: filterBy === Filter.Completed })}
      onClick={(event) => {
        event.preventDefault();
        setFilterBy(Filter.Active);
      }}
    >
      {Filter.Completed}
    </a>
  </nav>
);
