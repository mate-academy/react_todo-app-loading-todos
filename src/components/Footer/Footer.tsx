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
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {/* eslint-disable react/jsx-one-expression-per-line */}
        { activeTodosLength } items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: sortType === SortType.ALL,
          })}
          onClick={() => setSortType(SortType.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: sortType === SortType.ACTIVE,
          })}
          onClick={() => setSortType(SortType.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: sortType === SortType.COMPLETE,
          })}
          onClick={() => setSortType(SortType.COMPLETE)}
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
