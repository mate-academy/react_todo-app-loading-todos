import React from 'react';
import classNames from 'classnames';
import { FilteredBy } from '../../types/FilteredBy';

type Props = {
  filterBy: FilteredBy,
  setFilterBy: (FilteredBy: FilteredBy) => void,
};

export const Footer: React.FC<Props> = ({ filterBy, setFilterBy }) => {
  const handleClick = (value: FilteredBy) => {
    if (filterBy !== value) {
      setFilterBy(value);
    }
  };

  const handleAllClick = () => handleClick(FilteredBy.ALL);
  const handleActiveClick = () => handleClick(FilteredBy.ACTIVE);
  const handleCompletedClick = () => handleClick(FilteredBy.COMPLETED);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link', { selected: filterBy === FilteredBy.ALL },
          )}
          onClick={handleAllClick}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link', { selected: filterBy === FilteredBy.ACTIVE },
          )}
          onClick={handleActiveClick}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link', { selected: filterBy === FilteredBy.COMPLETED },
          )}
          onClick={handleCompletedClick}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
