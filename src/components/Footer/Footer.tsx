import React from 'react';
import classNames from 'classnames';

import { FilterByType } from '../../types/FilterBy';
import { FilterBy } from '../../utils/Enums/FilterBy';

interface Props {
  filterBy: FilterByType;
  setFilterBy: (filterBy: FilterBy) => void;
  isTodoCompleted: boolean;
  counter: number;
}

export const Footer: React.FC<Props>
  = ({
    filterBy, setFilterBy, isTodoCompleted, counter,
  }) => {
    return (
      <div>
        <footer className="todoapp__footer">
          <span className="todo-count">
            {counter}
            {' '}
            items left
          </span>

          <nav className="filter">
            <a
              href="#/"
              className={classNames({
                filter__link: filterBy !== FilterBy.ALL,
                'filter__link selected': filterBy === FilterBy.ALL,
              })}
              onClick={() => setFilterBy(FilterBy.ALL)}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames({
                filter__link: filterBy !== FilterBy.ACTIVE,
                'filter__link selected': filterBy === FilterBy.ACTIVE,
              })}
              onClick={() => setFilterBy(FilterBy.ACTIVE)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames({
                filter__link: filterBy !== FilterBy.COMPLETED,
                'filter__link selected': filterBy === FilterBy.COMPLETED,
              })}
              onClick={() => setFilterBy(FilterBy.COMPLETED)}
            >
              Completed
            </a>
          </nav>

          {isTodoCompleted && (
            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          )}
        </footer>
      </div>
    );
  };
