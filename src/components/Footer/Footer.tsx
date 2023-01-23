import React, { memo } from 'react';
import cn from 'classnames';
import { FilterType } from '../../types/FiltersType';

type Props = {
  activeTodos: number,
  filterType: FilterType,
  onChangeType: (str: FilterType) => void
};

export const Footer: React.FC<Props> = memo(({
  activeTodos,
  filterType,
  onChangeType,
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
            selected: filterType === FilterType.all,
          })}
          onClick={() => onChangeType(FilterType.all)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={cn('filter__link', {
            selected: filterType === FilterType.active,
          })}
          onClick={() => onChangeType(FilterType.active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={cn('filter__link', {
            selected: filterType === FilterType.completed,
          })}
          onClick={() => onChangeType(FilterType.completed)}
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
