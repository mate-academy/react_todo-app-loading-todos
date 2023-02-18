import React from 'react';
import cn from 'classnames';
import { SortType } from '../../types/SortType';

interface Props {
  isTodos: number;
  onSort: (sortType: SortType) => void;
  sortType: SortType
}
export const Footer: React.FC<Props> = ({
  isTodos,
  onSort,
  sortType,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${isTodos} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: sortType === SortType.ALL,
          })}
          onClick={() => onSort(SortType.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: sortType === SortType.ACTIVE,
          })}
          onClick={() => onSort(SortType.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: sortType === SortType.COMPLETED,
          })}
          onClick={() => onSort(SortType.COMPLETED)}
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
