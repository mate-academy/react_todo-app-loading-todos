import React from 'react';
import classNames from 'classnames';

import { FilterBy } from '../../types/FilterBy';

type Props = {
  filterBy: FilterBy,
  setFilterBy: (filterBy: FilterBy) => void;
  countActiveTodos: number,
  isClearButtonVisible: boolean,
};

export const Footer: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  countActiveTodos,
  isClearButtonVisible,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${countActiveTodos} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link',
            { selected: filterBy === FilterBy.ALL })}
          onClick={() => setFilterBy(FilterBy.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link',
            { selected: filterBy === FilterBy.ACTIVE })}
          onClick={() => setFilterBy(FilterBy.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link',
            { selected: filterBy === FilterBy.COMPLETED })}
          onClick={() => setFilterBy(FilterBy.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={!isClearButtonVisible}
      >
        Clear completed
      </button>
    </footer>
  );
};
