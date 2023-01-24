import React, { memo } from 'react';
import cn from 'classnames';
import { FilterType } from '../../types/FilterType';

type Props = {
  activeTodos: number;
  filterType: FilterType;
  selectFilterType: (filterType: FilterType) => void;
};

export const Footer: React.FC<Props> = memo(({
  activeTodos,
  filterType,
  selectFilterType,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={cn('filter__link', {
            selected: filterType === FilterType.ALL,
          })}
          onClick={() => selectFilterType(FilterType.ALL)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={cn('filter__link', {
            selected: filterType === FilterType.ACTIVE,
          })}
          onClick={() => selectFilterType(FilterType.ACTIVE)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={cn('filter__link', {
            selected: filterType === FilterType.COMPLETED,
          })}
          onClick={() => selectFilterType(FilterType.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
});
