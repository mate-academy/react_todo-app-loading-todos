import React, { memo } from 'react';
import cn from 'classnames';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  activeTodoQuantity: number,
  filterType: FilterStatus,
  onChange: (str: FilterStatus) => void
};

export const Footer: React.FC<Props> = memo(({
  activeTodoQuantity,
  filterType,
  onChange,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodoQuantity} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={cn('filter__link', {
            selected: filterType === FilterStatus.ALL,
          })}
          onClick={() => onChange(FilterStatus.ALL)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={cn('filter__link', {
            selected: filterType === FilterStatus.ACTIVE,
          })}
          onClick={() => onChange(FilterStatus.ACTIVE)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={cn('filter__link', {
            selected: filterType === FilterStatus.COMPLETED,
          })}
          onClick={() => onChange(FilterStatus.COMPLETED)}
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
