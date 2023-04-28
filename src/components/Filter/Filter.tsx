import classNames from 'classnames';
import React, { MouseEvent, useContext, useState } from 'react';

import { FilterContext } from '../../context/FilterContext';
import { SortType } from '../../types/SortType';

export const Filter: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState({
    all: true,
    active: false,
    completed: false,
  });

  const { setFilter } = useContext(FilterContext);

  const onFilterChange = (value: string) => {
    switch (value) {
      case SortType.ACTIVE:
        setFilter(SortType.ACTIVE);
        setActiveFilter({
          all: false,
          active: true,
          completed: false,
        });
        break;

      case SortType.COMPLETED:
        setFilter(SortType.COMPLETED);
        setActiveFilter({
          all: false,
          active: false,
          completed: true,
        });
        break;

      default:
        setFilter(SortType.ALL);
        setActiveFilter({
          all: true,
          active: false,
          completed: false,
        });
    }
  };

  const handlerOnClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = event.currentTarget;

    onFilterChange(target.innerText);
  };

  return (
    <nav className="filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: activeFilter.all,
        })}
        onClick={handlerOnClick}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: activeFilter.active,
        })}
        onClick={handlerOnClick}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: activeFilter.completed,
        })}
        onClick={handlerOnClick}
      >
        Completed
      </a>
    </nav>
  );
};
