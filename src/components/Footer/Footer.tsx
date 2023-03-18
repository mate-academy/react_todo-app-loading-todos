import React from 'react';
import classNames from 'classnames';
import { SortType } from '../../types/SortType';

type Props = {
  activeTodosLength: number;
  sortType: SortType;
  setSortType: (sortBy: SortType) => void;
};

export const Footer: React.FC<Props> = ({
  setSortType,
  sortType,
  activeTodosLength,
}) => {
  const handleSortType = (value: SortType) => {
    setSortType(value);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        { activeTodosLength }
        items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: sortType === SortType.ALL,
          })}
          onClick={() => handleSortType(SortType.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: sortType === SortType.ACTIVE,
          })}
          onClick={() => handleSortType(SortType.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: sortType === SortType.COMPLETE,
          })}
          onClick={() => handleSortType(SortType.COMPLETE)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
